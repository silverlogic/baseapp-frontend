# Module: `notifications`

This module is divided into three primary folders:

- **`common/`**: Contains platform-independent logic (utilities, hooks, or components that work in both web and native).
  - Can import from within or other `common/` folders.
  - Must not import from `web/` or `native/`.
- **`web/`**: Contains web-specific components and logic (e.g., React DOM, browser APIs, Material UI and others).
  - Can import from within or `common/`.
  - Must not import from `native/`.
- **`native/`**: Contains native-specific components and logic (e.g., React Native, Expo, React Native Paper and others)
  - Can import from within or `common/`.
  - Must not import from `web/`.

This structure ensures platform-specific code remains isolated, while shared code lives in one place.

## Notification setting groups

The backend can register **notification setting groups**: a key, a label, an optional description,
the channels it offers and whether it is locked. A notification belongs to a group when its verb is
the group key or starts with the group key followed by a dot (`EVENTS` covers `EVENTS` and
`EVENTS.REMINDER`). The viewer only sees the groups whose audience admits them.

### `NotificationSettingsGroups` (web)

One row per group, one switch per channel. A switch moves at once and goes back when the server
rejects the change (the error is shown as a toast). Locked groups render disabled with a hint.

```tsx
import { NotificationSettingsGroups } from '@baseapp-frontend/components/notifications/web'

const NotificationPreferences = () => (
  <NotificationSettingsGroups
    channelLabels={{ IN_APP: 'Portal', EMAIL: 'Email' }}
    groupColumnLabel="Notifications"
    lockedHint="Required — these notifications cannot be turned off."
    emptyStateText="There are no notification settings to manage."
    getSwitchLabel={(group, channel) => `${channel} notifications for ${group}`}
  />
)
```

Every piece of copy above is optional and shown with its default. Without a `user` prop the
component runs `NotificationSettingsGroupsQuery` itself; when the page query already spreads
`...NotificationSettingsGroups_user` on `me`, pass that fragment ref as `user` instead.

### `useNotificationSettingsGroups` (common)

The data hook behind the component, for a custom layout or React Native:

```ts
import { useNotificationSettingsGroups } from '@baseapp-frontend/components/notifications/common'

const { groups, channels, setChannelActive, isMutationInFlight } = useNotificationSettingsGroups({
  user, // a NotificationSettingsGroups_user fragment ref
})

setChannelActive('EVENTS', 'EMAIL', false)
```

`setChannelActive` sends `notificationSettingsUpdate` with that single channel state. The mutation
sets values (it never toggles), so sending the same change twice is harmless. Locked and unknown
groups are ignored on the client and rejected by the server. `useNotificationSettingsUpdateMutation`
is exported too, for sending several changes in one request.

### Listing one group's notifications

The web `NotificationsList` takes a `group` prop, which `NotificationsPopover` forwards through
`NotificationsListProps`:

```tsx
<NotificationsPopover NotificationsListProps={{ group: 'EVENTS' }} />
```

With a `group` the list runs `GroupNotificationsListQuery` (fragment `GroupNotificationsList_user`)
instead of `NotificationsListQuery`, so the default list never sends the `group` argument and keeps
working against a backend without setting groups. The filtered list is stored under its own
connection (`getGroupNotificationsConnectionId(userId, group)`), so `useNotificationsSubscription`
does not prepend live notifications to it; refetch it from `onNext` if it has to stay live.

## Notifications without a dedicated component

`NotificationItemRenderer` renders the comment and reaction verbs with their own components. Any
other verb renders with `GenericNotificationItem`: the actor's avatar when there is an actor, the
notification's `description`, the relative time and the unread dot.

**`data.url` convention:** when a notification's `data` holds a `url`, clicking the generic item
goes there. Use an app-relative path (`/events/12`) or an http(s) URL; anything else is ignored
(see `getNotificationUrl`). Projects still register verb-specific renderers the usual way, and can
change the fallback:

```tsx
<NotificationsPopover
  NotificationsListProps={{
    NotificationItemProps: {
      NotificationItemRendererProps: {
        // read the destination from somewhere else
        GenericNotificationItemProps: { getNotificationUrl: (n) => n.data?.link },
        // or render nothing for unknown verbs, as before:
        // GenericNotificationItem: null,
      },
    },
  }}
/>
```

## `useNotificationsSubscription` callbacks

The subscription hook takes an optional second argument with `onNext` (every payload, after Relay
has written it to the store) and `onError` (defaults to `console.error`). The callbacks may be
inline functions: they are read through a ref and never re-open the subscription.

```ts
useNotificationsSubscription(user?.id, {
  onNext: (response) => {
    if (response?.onNotificationChange?.createdNotification) playSound()
  },
})
```
