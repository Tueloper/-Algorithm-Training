import logger from "../../../../shared/logger";
import { Jira } from "../../../../shared/models";
import { JiraClient, JiraEventTypes, JiraTypes, UserExtractor } from "../../../../shared/product";
import {
  filterByAuthor,
  filterByComponents,
  filterByCustomFields,
  filterByLabels,
  filterByProject,
  filterByStatus, filterByUser, filterByUsers,
  filterEvent,
  filterInArray,
  filterOutRankChanges,
  filterPersonalNotification
} from "./filters";

export const shouldGetIssueFromApi = (
  eventIssue: any,
  eventName: JiraTypes.EventType
): boolean => {
  let result = false;

  if (eventName === JiraEventTypes.versionReleased) {
    result = false;
  } else if (isIssueCommentedEvent(eventName)) {
    // in issue commented event there are no issue fields, so we need to get them to filter well.
    result = true;
  } else if (isIssueLinkEvent(eventName)) {
    result = true;
  } else if (!eventIssue) {
    result = true;
  }

  return result;
};

export function isIssueLinkEvent(eventName: string) {
  return eventName && eventName.indexOf("issuelink_") >= 0;
}

export function isIssueCommentedEvent(eventName: string) {
  return eventName === JiraEventTypes.issueCommented || eventName === JiraEventTypes.commentCreated;
}

export async function shouldProcessConfiguration(
  co: Jira.MicrosoftTeams.BaseNotificationRuleConfiguration<Jira.MicrosoftTeams.BaseFilters>,
  eventName: string,
  event: any,
  jiraClient: JiraClient,
  wasMentionedInThisWebhook: boolean,
): Promise<boolean> {
  const issueLabels = event.issue?.fields?.labels || [];
  const issueCustomFieldsKeys = getIssueCustomFieldsThatBelongToConfiguration(event.issue?.fields, co.filters.customFields || []);
  const issueComponents = event.issue?.fields?.components ? event.issue.fields.components.map((c: any) => c.id) : [];
  const componentsStrategy = co.filters.componentsStrategy || Jira.MicrosoftTeams.MatchingStrategyValue.All;
  const labelsStrategy = co.filters.labelsStrategy || Jira.MicrosoftTeams.MatchingStrategyValue.All;

  logger.json("shouldProcessConfiguration config:", co);

  if (
    !isEnabled(co) ||
    !co.events ||
    !filterByAuthor(event) ||
    !filterOutRankChanges(event.changelog) ||
    !filterByProject(co.projectKey, event.projectKey, event.projectKeys) ||
    !filterEvent(co.events, eventName.toUpperCase(), event.changelog)
  ) {
    return false;
  }

  if (!event.issue) {
    return true;
  }

  const isPersonalNotification = !!(co as Jira.MicrosoftTeams.UserNotificationRuleConfiguration).userAccountId;

  logger.json("shouldProcessConfiguration personalNotification:", isPersonalNotification);

  switch (co.filterType) {
    case "filters":
      return (
        filterInArray(co.filters.issueTypes || [], event.issue?.fields?.issuetype?.id, "issue types") &&
        filterInArray(co.filters.issuePriorities || [], event.issue?.fields?.priority ? event.issue?.fields?.priority?.id : null, "priorities") &&
        filterByStatus(co, eventName.toUpperCase(), event, event.changelog) &&
        filterByComponents(co.filters.components, componentsStrategy, issueComponents) &&
        filterByCustomFields(co.filters.customFields || [], issueCustomFieldsKeys) &&
        filterByLabels(co.filters.labels, labelsStrategy, issueLabels) &&
        filterByUser(co.filters.reporters, co.filters.reporterGroups, event.issue?.fields?.reporter, "reporter") &&
        filterByUser(co.filters.assignees, co.filters.assigneeGroups, event.issue?.fields?.assignee, "assignee") &&
        filterByUser(co.filters.actors, co.filters.actorGroups, event.user, "actor") &&
        filterByUsers(co.filters.watchers, co.filters.watcherGroups, event.watchers, "watcher") &&
        (
          !isPersonalNotification || filterPersonalNotification(co, event, wasMentionedInThisWebhook)
        )
      );
    case "jql":
      return !!co.jql ? await jiraClient.doesIssueMatchJQL(parseInt(event.issue.id, 10), co.jql) : false;
    case "jiraFilter":
      const jql = await jiraClient.getFilterJQL(co.jiraFilter!);
      return !!jql ? await jiraClient.doesIssueMatchJQL(parseInt(event.issue.id, 10), jql) : false;
    default:
      return false;
  }
}

export function isEnabled(co: Jira.MicrosoftTeams.BaseNotificationRuleConfiguration<Jira.MicrosoftTeams.BaseFilters>): boolean {
  return co.hasOwnProperty("enabled") ? co.enabled : true;
}

export function getIssueCustomFieldsThatBelongToConfiguration(eventFields: any, configurationCustomFields: Jira.MicrosoftTeams.CustomField[]) {
  if (!configurationCustomFields || !configurationCustomFields.length || !eventFields) {
    return {};
  }

  const response: { [key: string]: any } = {};

  configurationCustomFields.forEach((c) => {
    if (eventFields[c.label]) {
      response[c.label] = eventFields[c.label];
    }
  });


  logger.debug("getIssueCustomFieldsThatBelongToConfiguration() -> ", response);

  return response;
}

export function isAssigneeChanged(changelog: any) {
  let result = false;
  if (changelog && changelog.items) {
    changelog.items.forEach((item: any) => {
      if (item && item.field && item.field.toLowerCase() === "assignee") {
        result = true;
      }
    });
  }

  logger.debug(`isAssigneeChanged RESULT IS ${result}`);

  return result;
}

export function shouldGetSprintProjectsFromApi(eventName: JiraTypes.EventType, configurations: Jira.MicrosoftTeams.BaseNotificationRuleConfiguration<Jira.MicrosoftTeams.BaseFilters>[]): boolean {
  let result = false;

  if (eventName.startsWith("sprint") &&
    configurations.find((x) => x.events.find((e) => e.toUpperCase().startsWith("SPRINT")))) {
    result = true;
  }

  if (eventName.startsWith("version") &&
    configurations.find((x) => x.events.find((e) => e.toUpperCase().startsWith("VERSION")))) {
    result = true;
  }

  logger.debug(`shouldGetSprintProjectsFromApi -> ${result}`);

  return result;
}

export function shouldGetIssueWatchersFromApi(event: any) {
  const issueHasWatchers = Boolean(event.issue?.fields?.watches?.watchCount);
  const issueHasNoWatchersData = Boolean(!event.issue?.fields?.watches);

  const result = issueHasWatchers || issueHasNoWatchersData;

  logger.debug(`issueHasWatchers: ${issueHasWatchers} | issueHasNoWatchersData: ${issueHasNoWatchersData} | shouldGetWatchersFromApi() -> ${result}`);

  return result;
}

export function shouldGetUserGroupsFromApi(
  configurations: Jira.MicrosoftTeams.BaseNotificationRuleConfiguration<Jira.MicrosoftTeams.BaseFilters>[],
  userGroup: "watcherGroups" | "actorGroups" | "assigneeGroups" | "reporterGroups",
) {
  const result = Boolean(configurations.filter((c) => c.filters[userGroup]?.length).length);
  logger.debug(`shouldGetUserGroupsFromApi(${userGroup}) -> ${result}`);
  return result;
}

export function shouldExtractUserMentionsInComment(event: any) {
  let result = false;
  if (
    event.issue_event_type_name === JiraEventTypes.issueCommented
    || event.webhookEvent === JiraEventTypes.commentCreated
    || event.webhookEvent === JiraEventTypes.commentUpdated
  ) {
    result = true;
  }

  logger.debug(`shouldExtractUserMentionsInComment is ${result}`);
  return result;
}

export function shouldExtractUserMentionsInIssue(event: any) {
  let result = false;
  if (
    event.issue_event_type_name === JiraEventTypes.issueCreated
    || event.issue_event_type_name === JiraEventTypes.issueUpdated
    || event.webhookEvent === JiraEventTypes.issueCreated
    || event.webhookEvent === JiraEventTypes.issueUpdated
  ) {
    result = true;
  }

  logger.debug(`shouldExtractUserMentionsInIssue is ${result}`);
  return result;
}

// export async function shouldSwapUserIdWithDisplayName(
//     mentionedUsers: string[],
//     event: any,
//     jiraClient: JiraClient
// ): Promise<any> {
//     if (mentionedUsers.length < 1) return event;

//     const userAccountId: string = mentionedUsers[0];
//     const user: JiraTypes.User = await jiraClient.getUser(userAccountId);

//     if (user?.displayName) {
//         if (shouldExtractUserMentionsInComment(event)) {
//             event.comment.body = UserExtractor.exchangeUserIdWithDisplayName(event.comment.body as string, userAccountId, user.displayName);
//         }

//         if (shouldExtractUserMentionsInIssue(event)) {
//             event.body.issue.fields.description = UserExtractor.exchangeUserIdWithDisplayName(event.body.issue.fields?.description as string, userAccountId, user.displayName);
//         }
//     }

//     return shouldSwapUserIdWithDisplayName(mentionedUsers.slice(1), event, jiraClient);
// }

// export async function shouldSwapUserIdWithDisplayName(
//     userAccountId: string,
//     text: string,
//     jiraClient: JiraClient
// ): Promise<string> {
//     const user: JiraTypes.User = await jiraClient.getUser(userAccountId);

//     if (user?.displayName) {
//         const textMessage = UserExtractor.exchangeUserIdWithDisplayName(text, userAccountId, user.displayName);
//         return textMessage;
//     }

//     return text;
// }


export async function shouldSwapUserIdWithDisplayName(
  mentionedUsers: string[],
  text: string,
  jiraClient: JiraClient,
  result = "",
): Promise<string> {
  if (mentionedUsers.length < 1) {
    return result !== "" ? result : text;
  }

  const userAccountId: string = mentionedUsers[0];
  const user: JiraTypes.User = await jiraClient.getUser(userAccountId);

  if (user?.displayName) {
    result = UserExtractor.exchangeUserIdWithDisplayName(text, userAccountId, user.displayName);
  }

  return shouldSwapUserIdWithDisplayName(mentionedUsers.slice(1), text, jiraClient, result);
}
