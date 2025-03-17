# @baseapp-frontend/components

## 1.0.23

### Patch Changes

- Refactor AccountPopover and improve some tests

## 1.0.22

### Patch Changes

- Add NotificationsList and NotificationBellWithBadge to native components
- Updated dependencies
  - @baseapp-frontend/design-system@1.0.9

## 1.0.21

### Patch Changes

- Change `Link` component in `NavItem`, to use Link from next/link instead of Material UI Link.
- Change `Header` border bottom from dashed to solid

## 1.0.20

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/authentication@4.1.9

## 1.0.19

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@1.0.8

## 1.0.18

### Patch Changes

- Moved ProfileSettingsComponent and related queries and mutations from `baseapp-frontend-template`
- Updated dependencies
  - @baseapp-frontend/design-system@1.0.7

## 1.0.17

### Patch Changes

- Fix image path handling for profile images
- Updated dependencies
  - @baseapp-frontend/authentication@4.1.8

## 1.0.16

### Patch Changes

- Fix Group creation and details on landscape mode

## 1.0.15

### Patch Changes

- Clickable profile on comments

## 1.0.14

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/authentication@4.1.7

## 1.0.13

### Patch Changes

- Remove `ProfileSettingsComponent` Appbar, it should now use `AppbarNavigationLayout` layout when it's rendered on a page route.
- Updated dependencies
  - @baseapp-frontend/design-system@1.0.6

## 1.0.12

### Patch Changes

- add filter by date to the module activity log. Filter as a modal on desktop and swap on mobile. Filtering can be don by start and/or end date

## 1.0.11

### Patch Changes

- Implementing Remove Profile Members

## 1.0.10

### Patch Changes

- Enable adding a member to an existing group
- Refactor member and contacts list into a reusable component
- Updated dependencies
  - @baseapp-frontend/design-system@1.0.5

## 1.0.9

### Patch Changes

- Enabled deletion of chat room messages

## 1.0.8

### Patch Changes

- Limit group name length
- Use ellipsis to prevent text overflow

## 1.0.7

### Patch Changes

- Enhanced the SocialInput component by introducing an optional keydown handler prop. This update enables custom keyboard event handling, with default behavior triggering submission on CTRL + Enter.

## 1.0.6

### Patch Changes

- Fix mobile vertical nav bar height

## 1.0.5

### Patch Changes

- Clean up the three dot menu in the chat header (do not display the option to leave a non-group chat, implement archiving chats from there)

## 1.0.4

### Patch Changes

- Implement a snackbar component with a 'progress bar' indicating the remaining time before it automatically disappears
- Updated dependencies
  - @baseapp-frontend/design-system@1.0.4
  - @baseapp-frontend/utils@3.1.5
  - @baseapp-frontend/authentication@4.1.6
  - @baseapp-frontend/graphql@1.2.6

## 1.0.3

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.1.4
  - @baseapp-frontend/authentication@4.1.5
  - @baseapp-frontend/design-system@1.0.3
  - @baseapp-frontend/graphql@1.2.5

## 1.0.2

### Patch Changes

- Fix release with catalogs.

## 1.0.1

### Patch Changes

- Fix `changeset` auto release.

## 1.0.0

### Major Changes

- Rearrange each `module` code into folders, `common` for multi-platform code, `native` for native code and `web` for web code.
- Transpile and bundle the package code using `babel`, `tsup` and `tsc`.
- Migrate native `profile` components from the template into this package.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@1.0.0
  - @baseapp-frontend/utils@3.1.3
  - @baseapp-frontend/authentication@4.1.4
  - @baseapp-frontend/graphql@1.2.4

## 0.0.58

### Patch Changes

- Add missing `AccountPopoverProps` to the `AccountMenu` component.
- Making sure conditonal render works on the `AccountMenu` component.

## 0.0.57

### Patch Changes

- add filter by user name

## 0.0.56

### Patch Changes

- Added leave group chat feature

## 0.0.55

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.34

## 0.0.54

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.33

## 0.0.53

### Patch Changes

- Implement system messages

## 0.0.52

### Patch Changes

- Added a popover menu for action options in the ActionsOverlay component.
- Introduced message update functionality with edit mode.
- Implemented hover overlay modes for enhanced action display.
- Introduced new DefaultHoverOverlay and ThreeDotsMenuHoverOverlay components for action overlays.

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.32

## 0.0.51

### Patch Changes

- Added search bar to members list. User can search for members by first name, last name and email.

## 0.0.50

### Patch Changes

- Update mock files.
- Updated dependencies
  - @baseapp-frontend/authentication@4.1.3
  - @baseapp-frontend/design-system@0.0.31
  - @baseapp-frontend/graphql@1.2.3
  - @baseapp-frontend/utils@3.1.2

## 0.0.49

### Patch Changes

- Removing chat room members
- Updated dependencies
  - @baseapp-frontend/graphql@1.2.2

## 0.0.48

### Patch Changes

- Chatroom search fixed

## 0.0.47

### Patch Changes

- Group details and group edit page added
- Updated dependencies
  - @baseapp-frontend/utils@3.1.1
  - @baseapp-frontend/authentication@4.1.2
  - @baseapp-frontend/design-system@0.0.30
  - @baseapp-frontend/graphql@1.2.1

## 0.0.46

### Patch Changes

- Create base activity log components for list page

## 0.0.45

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/authentication@4.1.1

## 0.0.44

### Patch Changes

- Add `expo` and `react-native` mock files.
- Updated dependencies
  - @baseapp-frontend/authentication@4.0.7
  - @baseapp-frontend/graphql@1.2.0
  - @baseapp-frontend/utils@3.1.0
  - @baseapp-frontend/design-system@0.0.28

## 0.0.43

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.28

## 0.0.42

### Patch Changes

- Update `zod` from 3.23.8 to 3.24.1
- Updated dependencies
  - @baseapp-frontend/authentication@4.0.7

## 0.0.41

### Patch Changes

- Added FollowToggle button
- Moved BlockButtonWithDialog, ProfileComponent and related queries and mutations from baseapp-frontend-template
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.27

## 0.0.40

### Patch Changes

- Refactors the `notification` module so it is easier to add or modify existing notification types.
- Implement reaction notification.

## 0.0.39

### Patch Changes

- Improve unread Badge and unread divider behavior

## 0.0.38

### Patch Changes

- Add the ability to create new chat groups.
- Fix a few height bugs on Virtuoso lists.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.26

## 0.0.37

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.5
  - @baseapp-frontend/authentication@4.0.6
  - @baseapp-frontend/design-system@0.0.25
  - @baseapp-frontend/graphql@1.1.15

## 0.0.36

### Patch Changes

- Graphql mutation for unreading chats introduced
- Graphql field unreadMessagesCount is replaced by a count field on unreadMessages (which also has a markedUnread field)

## 0.0.35

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/graphql@1.1.14

## 0.0.34

### Patch Changes

- Implement change role functionality on members section

## 0.0.33

### Patch Changes

- Introduces a chat header, which displays the profile image and name of the other person in a one-on-one chat and the group picture, group name and member count in a group chat

## 0.0.32

### Patch Changes

- Added unarchiving chat room UX updates (icon and label change)
- Added archiving/unarchiving chat rooms functionality
- Enhanced ChatRoomItem with isInArchivedTab and isInUnreadTab props
- Updated ChatRoomsList to support archived filters
- Added new GraphQL mutation for archiving chat rooms
- Updated RoomsListFragment to support archived status
- Modified useRoomListSubscription to handle archived rooms
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.24

## 0.0.31

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.23

## 0.0.30

### Patch Changes

- Adapt Storybook's withProviders to use only `queueOperationResolver`.
- Updated dependencies
  - @baseapp-frontend/graphql@1.1.13

## 0.0.29

### Patch Changes

- Fixed RoomListSubscription connection and added connection to CreateChatRoom mutation
- Moved useRoomListSubscription hook to ChatRoom on baseapp-frontend-template
- Removed unused fields on RoomsListFragment and RoomListSubscription

## 0.0.28

### Patch Changes

- Move useMessageCountUpdate to be used on chatrooms list instead of being used on the templates
- update useMessageCountUpdate query
- Fix unread count badge alignment

## 0.0.27

### Patch Changes

- Allow users to create new organization profile.

## 0.0.26

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/authentication@4.0.5

## 0.0.25

### Patch Changes

- Use `InitialProfileProviderForTesting`.
- Updated dependencies
  - @baseapp-frontend/authentication@4.0.4

## 0.0.24

### Patch Changes

- Remove `useCurrentProfile` from the package.
- Use mocks from `@baseapp-frontend/test`.

- Updated dependencies
  - @baseapp-frontend/authentication@4.0.3

## 0.0.23

### Patch Changes

- Create a component for listing the members of a profile

## 0.0.22

### Patch Changes

- Fixed overlay not closing issue by forcing hover state to 'false' when exiting the delete dialog

## 0.0.21

### Patch Changes

- Removed CommentOptions from CommentItem component and refactored into ActionsOverlay. Applied ActionsOverlay to CommentItem and ChatRoomItem components.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.22

## 0.0.20

### Patch Changes

- Add Active Tab functionality to the `messages` module.
- Several tweaks on the messages modules in general.
- Adapt `ChatRoomListItem` so it uses a fragment.
- Add `ViewportHeightContainer` component and make sure `MainCointainer` uses variables from the navigation's constants.
- Updated dependencies
  - @baseapp-frontend/authentication@4.0.2
  - @baseapp-frontend/design-system@0.0.21
  - @baseapp-frontend/graphql@1.1.12
  - @baseapp-frontend/utils@3.0.4

## 0.0.19

### Patch Changes

- Add Active Tab functionality to the `messages` module.
- Tweaks on `MessageItem` styles so it have the correct `max-width`.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.20

## 0.0.18

### Patch Changes

- Added the CreateChatRoom components for the messages module
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.19

## 0.0.17

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/design-system@0.0.17

## 0.0.16

### Patch Changes

- Storybook cleanup
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.17

## 0.0.15

### Patch Changes

- Add Storybook for notifications components.

## 0.0.14

### Patch Changes

- Add Message components including `MessageItem`, `MessageRoom`, `MessagesGroup` and `MessageList`.
- Temporarily remove the `overscan` props on Virtuoso lists since that could cause bugs.
- `AccountMenu` only show login/signup buttons when there is no user object instead of looking if the user is valid. That avoid issues when the refresh is is still going to be executed and the ui changing unnecessarily.

- Updated dependencies
  - @baseapp-frontend/graphql@1.1.11
  - @baseapp-frontend/utils@3.0.3
  - @baseapp-frontend/authentication@4.0.1
  - @baseapp-frontend/design-system@0.0.16

## 0.0.13

### Patch Changes

- Exclude cypress and jest folders from the tsconfig.build.json file

## 0.0.12

### Patch Changes

- Add the profile switcher to the AccountPopover component.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.15
  - @baseapp-frontend/graphql@1.1.10

## 0.0.11

### Patch Changes

- Add `fallbacks` and `alias` to the Cypress webpack configuration.

## 0.0.10

### Patch Changes

- Updated Storybook configs
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.14

## 0.0.9

### Patch Changes

- Add Messages module with SendMessage input for messages
- Make the previous comment input a reusable component to be used in comments and messages
- Reorganize modules to break previus social folder into comments, messages and `__shared__`
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.13

## 0.0.8

### Patch Changes

- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.
- Updated dependencies
  - @baseapp-frontend/authentication@4.0.0
  - @baseapp-frontend/utils@3.0.0
  - @baseapp-frontend/design-system@0.0.12
  - @baseapp-frontend/graphql@1.1.9

## 0.0.7

### Patch Changes

- Update profileObjectId to profileId on createCommentMutation

## 0.0.6

### Patch Changes

- Moved setFormRelayErrors from baseapp-frontend/components to baseapp-frontend/utils
- Updated dependencies
  - @baseapp-frontend/utils@2.5.6

## 0.0.5

### Patch Changes

- Add Notifications Component
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.10

## 0.0.4

### Patch Changes

- Import custom tailwind plugins.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.5
  - @baseapp-frontend/graphql@1.1.8

## 0.0.3

### Patch Changes

- Add setup for Cypress component testing.
- Add test cases for the `Comments` component.
- Minor adjustments to several social components, focusing on enhancing accessibility.
- Fix scrollbar glitching on web when loading more comments.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.3
  - @baseapp-frontend/graphql@1.1.7

## 0.0.2

### Patch Changes

- Add `navigation` module.
- Add Storybook for Navigation features.
- Updated dependencies
  - @baseapp-frontend/design-system@0.0.2
  - @baseapp-frontend/utils@2.5.4

## 0.0.1

### Patch Changes

- Create the `components` package.
- Migrate all the Comments features from the template to this package.
- Adapt some Comments features to make it more reusable and customizable.
- Add Storybook for the Comments features.
- Updated dependencies
  - @baseapp-frontend/graphql@1.1.4
  - @baseapp-frontend/utils@2.5.1
  - @baseapp-frontend/design-system@0.0.1
