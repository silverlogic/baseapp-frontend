# Module: `impersonation`

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

## What it does

Lets an authorized user (the *impersonator*) act as another user (the *target*) for a limited
time, against the backend's `baseapp_auth.impersonation` app:

1. `useStartImpersonation` calls `impersonationStart`, keeps the impersonator's tokens aside
   (`ImpersonatorAuthorization` / `ImpersonatorRefresh`), stores the session's tokens under the
   regular names, forgets the current profile and reloads the app. Every request from then on is
   made as the target.
2. `ImpersonationBanner` shows who is being impersonated, by whom, how long the session has left
   and an **End session** button.
3. `useEndImpersonation` calls `impersonationEnd`, puts the impersonator's tokens back, forgets
   the current profile and reloads the app. The tokens are put back whatever the server answers,
   so the impersonator is never left signed in as someone else. When the session expires the
   banner ends it on its own.

Whether the session may write (*act as*) or only read is decided by the backend
(`BASEAPP_AUTH_IMPERSONATION_READ_ONLY`). Nothing here assumes either: the banner reads
`readOnly` from the session ("Acting as …" or "Viewing as … (read only)"), and a write the backend
refuses comes back as an ordinary error with code `impersonation_read_only`.

The token helpers themselves (`swapInImpersonationTokens`, `restoreImpersonatorTokens`,
`hasImpersonatorTokens`, `clearImpersonatorTokens`) live in `@baseapp-frontend/authentication`,
and `useLogout` removes the kept-aside tokens too.

## Exports

| Path | Export | |
|---|---|---|
| `impersonation/common` | `useStartImpersonation(options)` | `{ startImpersonation(input, callbacks?), isStarting }` |
| | `useEndImpersonation(options)` | `{ endImpersonation(), isEnding }` |
| | `useImpersonationBanner(options)` | The banner's state and actions, for a custom banner |
| | `useImpersonationCountdown(expiresAt, { onExpire })` | `{ remainingMs, isExpired }` |
| | `ImpersonationBannerFragment` | `fragment ImpersonationBanner_user on User` |
| | `ImpersonationBannerQuery` | `query ImpersonationBannerQuery { me { ...ImpersonationBanner_user } }` |
| | `useImpersonationStartMutation`, `useImpersonationEndMutation` | The bare mutations |
| | `formatRemainingTime`, `getRemainingTime` | Countdown helpers |
| `impersonation/web` | `ImpersonationBanner` | Takes the `user` fragment ref |
| | `CurrentUserImpersonationBanner` | Loads `me` itself, only while a session runs |
| `impersonation/native` | `ImpersonationBanner` | Takes the `user` fragment ref and a required `onEnded` |

### `useStartImpersonation` / `useEndImpersonation` options

| Option | Default | |
|---|---|---|
| `redirectTo` | `'/'` | Where the app is reloaded once the tokens are swapped. |
| `onStarted(session)` / `onEnded({ restored })` | — | Called instead of the reload. The Relay store and any React Query cache still hold the previous user's data: recreate them. Required on native, where there is nothing to reload. |
| `onLogout()` | — | `useEndImpersonation` only: called when no tokens were kept aside (the session was started elsewhere), after the session's tokens were removed. `LOGOUT_EVENT` is broadcast as well. |
| `accessKeyName`, `refreshKeyName`, `impersonatorAccessKeyName`, `impersonatorRefreshKeyName` | the `@baseapp-frontend/utils` names | Custom token names. |

`startImpersonation({ targetUser, reason }, { onCompleted, onError })`: `targetUser` is the
user's relay id. `onCompleted` receives the response before anything is swapped, so a form can map
`impersonationStart.errors`; request failures (for example `permission_required`) are toasted and
passed to `onError`.

### Banner options

Both banners take the `useEndImpersonation` options plus:

| Prop | Default | |
|---|---|---|
| `user` | — | `ImpersonationBanner_user$key` of `me`. Nothing renders for `null` or outside a session. Not on `CurrentUserImpersonationBanner`. |
| `endOnExpiry` | `true` | End the session when the countdown reaches zero. |
| `endButtonLabel` | `'End session'` | |
| `ContainerProps` (web) / `style` (native) | — | The banner is `position: sticky; top: 0` on web. |

## Usage

Start a session, e.g. from a staff screen:

```tsx
import { useStartImpersonation } from '@baseapp-frontend/components/impersonation/common'

const ActAsButton = ({ userId }: { userId: string }) => {
  const { startImpersonation, isStarting } = useStartImpersonation({ redirectTo: '/dashboard' })

  return (
    <Button
      disabled={isStarting}
      onClick={() => startImpersonation({ targetUser: userId, reason: 'Support ticket 1234' })}
    >
      Act as this user
    </Button>
  )
}
```

Show the banner once, in the root layout:

```tsx
import { CurrentUserImpersonationBanner } from '@baseapp-frontend/components/impersonation/web'

<CurrentUserImpersonationBanner redirectTo="/staff/users" />
```

or, when the layout already queries `me`, spread the fragment there and pass it:

```tsx
// query LayoutQuery { me { ...ImpersonationBanner_user } }
<ImpersonationBanner user={data.me} />
```

On native, pass `onStarted` / `onEnded` and recreate the Relay environment there (for example by
changing the `key` of your `RelayEnvironmentProvider`), then navigate.

## Backend

Needs `baseapp_auth.impersonation` installed (`impersonationStart`, `impersonationEnd` and
`User.impersonation`). Who may impersonate whom, the session length and read-only mode are all
backend settings.
