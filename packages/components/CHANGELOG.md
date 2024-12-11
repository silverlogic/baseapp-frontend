# @baseapp-frontend/components

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
