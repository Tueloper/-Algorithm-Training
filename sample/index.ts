require("source-map-support").install();

import { AnalyticsProcessorModel, SegmentAnalyticsScheduler } from "../../../../shared/analytics";
import { StageType } from "../../../../shared/consts";
import { Id } from "../../../../shared/id";
import { SqsQueueWriter } from "../../../../shared/infra";
import { ErrorResponse, ResponseHelper } from "../../../../shared/lambda";
import { License } from "../../../../shared/license";
import { logger } from "../../../../shared/logger";
import { Atlassian, Jira } from "../../../../shared/models";
import * as Product from "../../../../shared/product";
import { CommonTypes, JiraEventTypes, JiraTypes, UserExtractor } from "../../../../shared/product";
import repositoryFactory from "../../../../shared/repository";
import { JwtVerifier, ParameterValidator } from "../../../../shared/security";
import { SqsNotificationScheduler } from "../../notification-scheduler";
import {
    isIssueLinkEvent, shouldExtractUserMentionsInComment, shouldExtractUserMentionsInIssue,
    shouldGetIssueFromApi, shouldGetIssueWatchersFromApi, shouldSwapUserIdWithDisplayName
} from "./helpers";
import { JiraWebhookNotificationProcessor, JiraWebhookNotificationProcessorModel } from "./webhook-processor";


const stage = process.env.STAGE as StageType;
const repository = repositoryFactory.create(stage);
const queueWriter = new SqsQueueWriter();
const notificationScheduler = new SqsNotificationScheduler();
const analyticsScheduler = new SegmentAnalyticsScheduler();

export const handler = async (event: any): Promise<ErrorResponse | void> => {
    logger.json("Webhook event", event);

    if (!event.headers || !event.headers.Authorization) {
        throw new Error("Authorization header is not present.");
    }

    const jwt = event.headers.Authorization.substring(4);
    const { addonId } = event.path;
    const { name: eventName, lic: license, projectKey, issueId } = event.query;

    let payload: Atlassian.Lifecycle.InstalledPayload | undefined;

    try {
        ParameterValidator.validateJwt(jwt);
        ParameterValidator.validateLicense(license);
        ParameterValidator.validateAppIdMstJira(addonId);

        if (!isSprintEvent(eventName) && !isIssueLinkEvent(eventName)) {
            ParameterValidator.validateProjectKey(projectKey);

            if (eventName !== JiraEventTypes.versionReleased) {
                ParameterValidator.validateIssueId(issueId);
            }
        }

        payload = await JwtVerifier.verify<Atlassian.Lifecycle.InstalledPayload>(jwt, async (input: { clientKey: string; }) => {
            logger.debug(`addonId[${addonId}], clientKey[${input.clientKey}]`);
            const installed = await repository.lifecycle.getInstalled({ addonId, clientKey: input.clientKey });
            if (!installed) {
                throw new Error(`Cannot find installed payload for clientKey[${input.clientKey}]`);
            }
            return installed;
        });

        const { baseUrl, clientKey } = payload;

        if (!License.isAppLicenseValid(addonId, license, baseUrl)) {
            logger.error(`The license is not active, so we cannot proceed.`);

            await track({
                addonId,
                analyticsEventName: "Received webhook not license",
                baseUrl,
                clientKey,
                eventName,
                license,
            });

            return;
        }

        const globalAndProjectSettings: Jira.MicrosoftTeams.NotificationRule | undefined = await repository
            .mstJira
            .getGlobalConfiguration({ addonId, clientKey });

        const jiraClient: Product.JiraClient = new Product.Jira(payload);

        if (shouldGetIssueFromApi(event.body.issue, eventName)) {
            if (isIssueLinkEvent(eventName) && event.body.issueLink) {
                logger.debug(`Getting issues for issue link event. sourceIssueId[${event.body.issueLink.sourceIssueId}] destinationIssueId[${event.body.issueLink.destinationIssueId}]`);
                
                event.issue = await jiraClient.getIssue(event.body.issueLink.sourceIssueId);
                event.destinationIssue = await jiraClient.getIssue(event.body.issueLink.destinationIssueId);
            } else if (issueId) {
                event.body.issue = await jiraClient.getIssue(issueId);
                logger.json(`Got issue[${issueId}]`, event.body.issue);
            }
        } else {
            logger.debug(`shouldGetIssueFromApi is false`);
        }

        const isTenantMappedAndIssueIdPresent: boolean = !!issueId && await repository
            .mstJira
            .getTenantBotMapping({ addonId, clientKey });

        let userAccountIds = UserExtractor.extractUserIds(event.body);
        
        if (isTenantMappedAndIssueIdPresent && shouldGetIssueWatchersFromApi(event.body)) {
            const watchers: JiraTypes.User[] = (await jiraClient.getIssueWatchers(issueId)).watchers;
            event.body.watchers = watchers;
            logger.json("fetched watchers: ", watchers);
            if (watchers?.length) {
                userAccountIds.push(...watchers.map((w: JiraTypes.User) => w.accountId));
            }
        }

        let mentionedUsers: string[] = [];
        if (shouldExtractUserMentionsInComment(event.body)) {
            const commentEvents = event.body as unknown as JiraTypes.CommentEntry;
            mentionedUsers = UserExtractor.extractUserMentionIds(commentEvents.comment.body as string);

            if (mentionedUsers?.length) {
                commentEvents.comment.body = await shouldSwapUserIdWithDisplayName(mentionedUsers, commentEvents.comment?.body as string, jiraClient);
                event.body = commentEvents;
            }
        } else if (shouldExtractUserMentionsInIssue(event.body)) {
            mentionedUsers = UserExtractor.extractUserMentionIds(event.body.issue.fields?.description);

            if (mentionedUsers?.length) {
                event.body.issue.fields.description = await shouldSwapUserIdWithDisplayName(mentionedUsers, event.body.issue.fields?.description as string, jiraClient);
            }
        }

        if (mentionedUsers.length) {
            userAccountIds = userAccountIds.concat(mentionedUsers);
            logger.json("User is Mentioned", mentionedUsers);
        }
        
        userAccountIds = [...new Set(userAccountIds)];

        const userAccountIdsLength = userAccountIds?.length || 0;
        const configurations = [];
        for (let i = 0; i < userAccountIdsLength; i++) {
            const userAccountId = userAccountIds[i];

            if (!userAccountId) continue;
            
            const u: Jira.MicrosoftTeams.UserNotificationRule | undefined = await repository
                .mstJira
                .getUserConfigurationsForUser({ userAccountId, tenant: clientKey });

            if (u?.config) {
                configurations.push(...u.config);
            }
        }

        if (!globalAndProjectSettings) {
            logger.info(`Global settings were not found for addonId[${addonId}] and clientKey[${clientKey}]`);

            await repository
                .mstJira
                .saveGlobalConfiguration({
                    addonId,
                    clientKey,
                    botConnectionToken: Id.jiraCloudTenantId(),
                    config: [],
                } as Jira.MicrosoftTeams.NotificationRule);
        } else {
            configurations.push(...globalAndProjectSettings.config);
        }

        if (configurations.length === 0) {
            logger.debug(`There are no configs for this webhook. Exiting.`);

            track({
                ...payload,
                analyticsEventName: "Webhook no configs",
                eventName,
                license,
            });

            return;
        }

        const model: JiraWebhookNotificationProcessorModel = {
            baseUrl,
            addonId,
            clientKey,
            license,
            event: event.body,
            eventName,
            config: configurations,
            projectKey,
            issueId,
            mentionedUsers,
        };

        
        const webhookProcessor = new JiraWebhookNotificationProcessor(
            notificationScheduler,
            jiraClient,
            analyticsScheduler,
            repository
        );

        await webhookProcessor.process(model);

        return;
    } catch (error) {
        logger.error("Webhook - ERROR: ", error);

        if (payload) {
            track({
                ...payload,
                analyticsEventName: "Webhook error",
                eventName,
                license,
            });
        }

        return ResponseHelper.createErrorResponse(error);
    }
};

interface TrackModel {
    analyticsEventName: string;
    eventName: string;
    addonId: string;
    clientKey: string;
    baseUrl: string;
    license: CommonTypes.LicenseType;
}

async function track(model: TrackModel) {
    const { addonId, analyticsEventName, baseUrl, clientKey, eventName, license } = model;
    const message: AnalyticsProcessorModel = {
        event: {
            name: analyticsEventName,
            properties: {
                eventName,
                isNew: true,
            },
        },
        product: {
            id: addonId,
            stage,
        },
        tenant: {
            clientKey,
            baseUrl,
            id: clientKey,
            license,
        },
    };

    const queueName = process.env.ANALYTICS_QUEUE_NAME as string;
    return queueWriter.enqueue({ queueName, message });
}

function isSprintEvent(eventName: Product.JiraTypes.EventType) {
    return eventName && eventName.indexOf("sprint_") >= 0;
}
