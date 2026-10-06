---
"@baseapp-frontend/components": major
---

**Breaking:** thumbnail fields resolve to a `String` URL instead of an object, so every
Relay document that selected a sub-field on one of them has to drop its selection set.
This needs the matching backend, where `ThumbnailField` now returns a `String` — an older
backend paired with this version (or the reverse) fails Relay compilation rather than
failing at runtime.

Affected fields: `image(width:, height:)`, `avatar(width:, height:)` and
`bannerImage(width:, height:)` on every type exposing them.

Migration — in your own GraphQL documents:

```graphql
# before
image(width: 100, height: 100) {
  url
}

# after
image(width: 100, height: 100)
```

and wherever you read the value:

```ts
// before
src={profile.image?.url}
// after
src={profile.image ?? undefined}
```

Relay compilation fails loudly on anything missed (`Expected no selections on scalar
field 'image' of type 'Profile'`), so `pnpm relay` locates every remaining site.

Fragments updated in this package, for reference when diffing a fork:
`ActivityLogsFragment`, `CommentItem`, `ContentPostImage`, `AddContactToGroupItem`,
`MessagesList`, `RoomTitle`, `SingleChatDetailsFragment`, `NotificationItem`,
`InviteMembersSearch`, `ProfileComponent`, `ProfileItem`.

Mock payloads in tests and stories need the same treatment — a fixture still shaped
`image: { url }` normalises to `undefined` and the component silently renders nothing
rather than failing.
