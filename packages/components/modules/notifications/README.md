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
`EVENTS.REMINDER`), or when the group was registered with an explicit verb list that names it. The
viewer only sees the groups whose audience admits them.

### Backend compatibility

This module needs the baseapp-backend release that adds notification setting groups: the schema
must have `User.notificationSettingGroups`, the `notificationSettingsUpdate` mutation and the
`group` argument on `notifications`. A project that compiles this package's sources with its own
schema (the template projects do: their `relay.config.js` scans the `baseapp-frontend` submodule)
fails `relay-compiler` against an older schema, even if it never renders these components. Upgrade
in this order:

1. Upgrade baseapp-backend and deploy it to the environment you download the schema from.
2. Run `pnpm relay:download-schema` and check that `schema.graphql` has `notificationSettingGroups`.
3. Upgrade `@baseapp-frontend/components` and run `pnpm relay`.

At runtime the unfiltered list still sends the same `NotificationsListQuery` as before.

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

### `NotificationSettingsGroups` (native)

The same props as on web, laid out for a phone: one section per group with its label, description
and locked hint, then one row per channel with a `react-native-paper` `Switch`. `getSwitchLabel`
sets each switch's `accessibilityLabel`. While the query loads it renders `LoadingState`
(default: the design system's `LoadingScreen`).

```tsx
import { NotificationSettingsGroups } from '@baseapp-frontend/components/notifications/native'

const NotificationPreferencesScreen = () => (
  <ScrollView>
    <NotificationSettingsGroups channelLabels={{ IN_APP: 'In the app' }} />
  </ScrollView>
)
```

### `useNotificationSettingsGroups` (common)

The data hook behind both components, for a custom layout:

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

`NotificationsList` (web and native) takes a `group` prop. On web, `NotificationsPopover` forwards
it through `NotificationsListProps`:

```tsx
<NotificationsPopover NotificationsListProps={{ group: 'EVENTS' }} />
```

```tsx
// native
<NotificationsList group="EVENTS" />
```

With a `group` the list loads through `useGroupNotificationsList(group)` (common), which runs
`GroupNotificationsListQuery` (fragment `GroupNotificationsList_user`) instead of
`NotificationsListQuery`. The list then returns what the backend's `group` filter returns, including
verbs a group lists explicitly. Two behaviours differ from the unfiltered list:

- **"Mark all as read"** marks only the group's loaded unread notifications, by id, through
  `notificationsMarkAsRead`; `notificationsMarkAllAsRead` would mark every group. It shows (web) or
  is enabled (native) only when the group has a loaded unread notification. The backend lists unread
  notifications first, so this covers every unread notification of the group up to the loaded page
  size; the list refetches afterwards and offers the button again if more remain.
- **Live updates:** the filtered list has its own connection
  (`getGroupNotificationsConnectionId(userId, group)`), and `useNotificationsSubscription` prepends
  only to the unfiltered one, because only the backend knows which group a verb belongs to. Instead,
  the group list refetches its first page whenever the user's unread count rises, which the
  subscription does for every new notification. The web popover and the native list run the
  subscription; a custom screen must run `useNotificationsSubscription` itself.

## Notifications without a dedicated component

`NotificationItemRenderer` (web and native) renders the comment and reaction verbs with their own
components. Any other verb renders with `GenericNotificationItem`: the actor's avatar and name when
the actor is a profile, the notification's `description`, the relative time and the unread dot.

**`data.url` convention:** when a notification's `data` holds a `url`, clicking the generic item on
web goes there and closes the notifications drawer. Use an app-relative path (`/events/12`) or an
http(s) URL; anything else, including `//host` and `/\host`, is ignored (see `getNotificationUrl`). Projects still register verb-specific renderers the usual way, and can
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

On native, `NotificationItem` takes an `onPress` called with the notification after it is marked as
read; navigate from there, since the app owns its router:

```tsx
import { getNotificationUrl } from '@baseapp-frontend/components/notifications/common'
import { NotificationsList } from '@baseapp-frontend/components/notifications/native'
import { router } from 'expo-router'

<NotificationsList
  NotificationItemProps={{
    onPress: (notification) => {
      const url = getNotificationUrl(notification.data)
      if (url?.startsWith('/')) router.push(url)
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
