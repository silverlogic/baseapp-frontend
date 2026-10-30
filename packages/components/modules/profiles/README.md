# Module: `profiles`

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

## `ProfileComponent` (web): `MessageButton` slot

`ProfileComponent` takes an optional `MessageButton?: FC<ProfileComponentMessageButtonProps> | null`,
where `ProfileComponentMessageButtonProps` is `{ profileId: string }` (exported from
`@baseapp-frontend/components/profiles/web`). When it is set, it is rendered next to the follow
button on any profile that is not the current one and that the current profile has not blocked
(`isBlockedByMe`). It defaults to `null`, so nothing changes for existing pages.

`MessageProfileButton` from `@baseapp-frontend/components/messages/web` fits the slot as it is:

```tsx
import { MessageProfileButton } from '@baseapp-frontend/components/messages/web'
import { ProfileComponent } from '@baseapp-frontend/components/profiles/web'

<ProfileComponent
  profile={profile}
  currentProfileId={currentProfile?.id}
  MessageButton={MessageProfileButton}
/>
```

To add navigation or app rules, wrap it in a component defined once, at module level (or memoised
with `useCallback`), not inline in JSX. An inline arrow is a new component type on every render, so
the button would remount whenever the profile page re-renders and lose its loading state.

```tsx
const ProfileMessageButton: FC<ProfileComponentMessageButtonProps> = ({ profileId }) => {
  const router = useRouter()
  return (
    <MessageProfileButton
      profileId={profileId}
      onRoomReady={(roomId) => router.push(`/messages?room=${roomId}`)}
    />
  )
}

<ProfileComponent profile={profile} currentProfileId={currentProfile?.id} MessageButton={ProfileMessageButton} />
```

The slot does no eligibility check of its own. The wrapper is also the place for app rules, e.g.
return `null` when the app's own permission says the current profile may not message this one.
