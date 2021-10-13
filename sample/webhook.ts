
import * as i18n from "i18n";
import * as moment from "moment";
import * as path from "path";
import { AnalyticsScheduler } from "../../../../shared/analytics";
import { logger } from "../../../../shared/logger";
import { Jira } from "../../../../shared/models";
import { CommonTypes, JiraClient, JiraEventTypes, JiraTypes } from "../../../../shared/product";
import { RepositoryType } from "../../../../shared/repository";
import { NotificationScheduler } from "../../notification-scheduler";
import {
  isAssigneeChanged,
  isIssueLinkEvent, shouldExtractUserMentionsInComment, shouldExtractUserMentionsInIssue,
  shouldGetSprintProjectsFromApi,
  shouldGetUserGroupsFromApi, shouldProcessConfiguration, shouldSwapUserIdWithDisplayName
} from "./helpers";

interface WebhookNotificationEvent {
  projectKey?: string;
  baseUrl?: string;
  issue_event_type_name: string;
  issue: JiraTypes.Issue;
  issueLink?: {
    sourceIssueId: string;
    destinationIssueId: string;
  };
  webhookEvent: string;
  destinationIssue?: JiraTypes.Issue;
  sprint?: {
    originBoardId: number;
  };
  changelog: any;
  projectKeys?: string[];
  watchers?: JiraTypes.User[];
  user?: {
    accountId: string;
    groups?: JiraTypes.Group[];
  };
}

export interface JiraWebhookNotificationProcessorModel {
  addonId: string;
  baseUrl: string;
  clientKey: string;
  license: CommonTypes.LicenseType;

  event: WebhookNotificationEvent;
  eventName: JiraTypes.EventType;
  config: Jira.MicrosoftTeams.BaseNotificationRuleConfiguration<Jira.MicrosoftTeams.BaseFilters>[];

  projectKey?: string;
  issueId?: string;

  mentionedUsers?: string[];
}

i18n.configure({
  directory: path.join(__dirname, "..", "..", "..", "..", "locales"),
  register: global
});

export class JiraWebhookNotificationProcessor {
  private _analyticsScheduler: AnalyticsScheduler;
  private _notificationScheduler: NotificationScheduler;
  private _jiraClient: JiraClient;
  private _repository: RepositoryType;

  constructor(notificationScheduler: NotificationScheduler, jiraClient: JiraClient, analyticsScheduler: AnalyticsScheduler, repository: RepositoryType) {
    this._notificationScheduler = notificationScheduler;
    this._jiraClient = jiraClient;
    this._analyticsScheduler = analyticsScheduler;
    this._repository = repository;
  }

  public async process(model: JiraWebhookNotificationProcessorModel) {
    const { event } = model;
    const { baseUrl, config, addonId, clientKey, mentionedUsers } = model;

    event.projectKey = model.projectKey;
    event.baseUrl = baseUrl;

    const projectSettings: Jira.MicrosoftTeams.Settings | undefined =
      await this._repository.mstJira.getSettings({ addonId, clientKey });

    const projectKey: string | undefined = model.projectKey ?? "";

    if (projectKey && projectSettings?.value?.appDisallowedInProjects.includes(projectKey)) {
      logger.info(`${projectKey} is disallowed from receiving notifications globally`);
      return;
    }

    await this._analyticsScheduler.trackWebhook("Received webhook", model);

    let eventName: JiraTypes.EventType = model.eventName.replace("-", "_") as JiraTypes.EventType;
    if (event.issue_event_type_name === JiraEventTypes.issueCommented || event.webhookEvent === "comment_created") {
      eventName = JiraEventTypes.issueCommented;
    } else if (event.issue_event_type_name === "issue_generic") {
      eventName = "issue_genericevent";
    } else if (eventName.toUpperCase() === "ISSUE_UPDATED" && isAssigneeChanged(event.changelog)) {
      eventName = "issue_assigned";
    }

    let processed = false;

    if (shouldGetSprintProjectsFromApi(eventName, config) && event.sprint?.originBoardId) {
      event.projectKeys = await this._jiraClient.getProjectKeysByBoardId(event.sprint.originBoardId);
    } else if (isIssueLinkEvent(eventName)
      && event.issue?.fields?.project?.key
      && event.destinationIssue?.fields?.project?.key) {
      event.projectKeys = [event.issue.fields.project.key, event.destinationIssue.fields.project.key];
    }

    if (model.issueId && event.issue?.fields?.reporter?.accountId && shouldGetUserGroupsFromApi(config, "reporterGroups")) {
      event.issue.fields.reporter.groups = (await this._jiraClient.getUserGroups(event.issue.fields.reporter.accountId));
    }

    if (model.issueId && event.issue?.fields?.assignee?.accountId && shouldGetUserGroupsFromApi(config, "assigneeGroups")) {
      event.issue.fields.assignee.groups = (await this._jiraClient.getUserGroups(event.issue.fields.assignee.accountId));
    }

    if (model.issueId && event.user?.accountId && shouldGetUserGroupsFromApi(config, "actorGroups")) {
      event.user.groups = await this._jiraClient.getUserGroups(event.user.accountId);
    }

    if (model.issueId && event.watchers?.length && shouldGetUserGroupsFromApi(config, "watcherGroups")) {
      await Promise.all(event.watchers.map(async (user: JiraTypes.User) => {
        user.groups = (await this._jiraClient.getUserGroups(user.accountId));
      }));
    }

    // if (mentionedUsers?.length) {
    //     event = await shouldSwapUserIdWithDisplayName(mentionedUsers, event, this._jiraClient);
    // } 

    const locale = await this._jiraClient.getLocale();
    moment.locale(locale);
    i18n.setLocale(locale);

    logger.json("shouldProcessConfiguration event: ", event);

    const promiseResult = await Promise.all(config.map(async (co) => {
      logger.json("Configuration: ", co);

      let wasMentionedInThisWebhook = false;
      const personalConfig = co as Jira.MicrosoftTeams.UserNotificationRuleConfiguration;

      if (mentionedUsers?.includes(personalConfig.userAccountId)) {
        wasMentionedInThisWebhook = true;

        if (shouldExtractUserMentionsInComment(event)) {
          if (event.comment) {

          }
        }

        if (shouldExtractUserMentionsInIssue(event)) {
          event.issue.fields.description = await shouldSwapUserIdWithDisplayName(personalConfig.userAccountId, event.issue?.fields?.description as string, this._jiraClient);
        }

        logger.json("User is Mentioned", { mentionedUsers: model.mentionedUsers, wasMentionedInThisWebhook });
      }

      const checkResult = await shouldProcessConfiguration(co, eventName, event, this._jiraClient, wasMentionedInThisWebhook);

      logger.debug(`shouldProcessConfiguration returned ${checkResult}`);

      if (checkResult) {
        processed = true;

        const destination: Jira.MicrosoftTeams.Destination = {
          useBot: !!co.destination?.useBot,
          url: co.destination
            ? co.destination.url
            : (co as Jira.MicrosoftTeams.NotificationRuleConfiguration).webHookUrl!,
          team: co.destination?.team,
          channel: co.destination?.channel,
        };

        const isPersonalNotification = !!(co as Jira.MicrosoftTeams.UserNotificationRuleConfiguration).userAccountId;

        if (isPersonalNotification) {
          destination.productUserAccountId = (co as Jira.MicrosoftTeams.UserNotificationRuleConfiguration).userAccountId;
        }

        const scheduledMessage = {
          clientKey: model.clientKey,
          config: co,
          destination,
          event,
          eventName,
        };

        await this._notificationScheduler.scheduleMessageNotification(scheduledMessage);

        logger.debug(`message scheduled for ${isPersonalNotification ? "personal" : "global/project"} configuration.`);

        return scheduledMessage;
      }

      return undefined;
    }));

    if (!processed) {
      logger.debug("There is no config set to true");
    }

    return promiseResult;
  }
}
