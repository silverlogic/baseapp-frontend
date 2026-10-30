---
'@baseapp-frontend/components': major
---

**Breaking:** the notifications module now needs a baseapp-backend with notification setting
groups, and it supports them on web and native.

This needs the matching backend: the baseapp-backend release that adds notification setting groups
(`User.notificationSettingGroups`, the `notificationSettingsUpdate` mutation and the `group`
argument on `notifications`). Projects that compile this package's sources with their own schema,
such as the template projects, fail `relay-compiler` against an older schema (unknown type
`NotificationSettingsUpdateInput`, unknown argument `group`, no field `notificationSettingGroups`),
even if they never render the new components. Release the two together: upgrade baseapp-backend,
re-download the schema (`pnpm relay:download-schema`), then upgrade this package. At runtime, the
existing list still sends the same query as before.

- New `NotificationSettingsGroups` (web and native) and `useNotificationSettingsGroups`: one row per
  group the viewer can manage, one switch per channel, optimistic updates rolled back when the
  server rejects them, locked groups disabled with a hint, and every piece of copy replaceable
  through props.
- `NotificationsList` (web and native) takes a `group` prop that lists only one group's
  notifications, through the new `useGroupNotificationsList`. "Mark all as read" then marks only
  the group's loaded unread notifications, and the list refetches when the user's unread count
  rises. `MarkAllAsReadButton` takes `notificationIds`.
- **Behaviour:** `NotificationItemRenderer` (web and native) renders verbs without a dedicated
  component with the new `GenericNotificationItem` instead of nothing. Pass
  `GenericNotificationItem={null}` to keep the previous behaviour. The web item links to the
  notification's `data.url` and closes the drawer when followed; the native `NotificationItem`
  takes an `onPress` for navigation.
- `useNotificationsSubscription(userId, { onNext, onError })` accepts callbacks; the single-argument
  call is unchanged.
- `getNotificationUrl(data)` reads a notification's `data.url`, accepting only app-relative paths and
  http(s) URLs.
