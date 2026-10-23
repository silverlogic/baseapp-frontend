# Module: `messages`

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

## `MessageProfileButton` (web)

A "Message" button that opens a one-to-one chat with a profile, for use on profile pages,
directories, member lists and similar places outside the messages screen.

```tsx
import { MessageProfileButton } from '@baseapp-frontend/components/messages/web'

<MessageProfileButton
  profileId={profile.id}
  onRoomReady={(roomId) => router.push(`/messages?room=${roomId}`)}
/>
```

- It commits `chatRoomCreate` with `{ profileId: <actor>, participants: [profileId] }`. The backend
  returns the existing room when the two profiles already have one, so clicking it twice does not
  create a second room. The room is prepended to the actor's rooms list.
- The chat is created as the current (active) profile, so a user who switched to an organization
  messages as that organization. Pass `actorProfileId` to send as another profile the user can use.
- `onRoomReady(roomId)` is called once the room exists; navigating to it is up to the app. Payload
  and network errors are toasted and do not call it.
- It renders nothing for an anonymous user or on the profile it would send as.
- It needs a `ChatRoomProvider`. It uses the surrounding one when there is one (so the room becomes
  the selected room in the messages UI) and brings its own otherwise.
- `label` (default `'Message'`) and `ButtonProps` (passed to MUI's `LoadingButton`) customise the
  button.

Whether the actor may message the profile is decided by the backend (`baseapp_chats.add_chatroom`);
apps that restrict messaging should also hide the button where the backend would refuse.
