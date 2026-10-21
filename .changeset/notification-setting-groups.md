---
'@baseapp-frontend/components': minor
---

Notifications: support notification setting groups from the backend group registry.

- New `NotificationSettingsGroups` web component and `useNotificationSettingsGroups` hook: one row per
  group the viewer can manage, one switch per channel, optimistic updates rolled back when the server
  rejects them, locked groups disabled with a hint, and every piece of copy replaceable through props.
  They use the new `notificationSettingGroups` field and `notificationSettingsUpdate` mutation.
- The web `NotificationsList` takes a `group` prop that lists only one group's notifications. It runs
  the new `GroupNotificationsListQuery`; without the prop the list sends the same query as before.
- `NotificationItemRenderer` renders verbs without a dedicated component with the new
  `GenericNotificationItem` instead of nothing; it links to the notification's `data.url`. Pass
  `GenericNotificationItem={null}` to keep the previous behaviour.
- `useNotificationsSubscription(userId, { onNext, onError })` accepts callbacks; the single-argument
  call is unchanged.

Requires a backend that exposes `notificationSettingGroups` and `notificationSettingsUpdate` for the
settings component and the `group` filter; the other changes work with any backend.
