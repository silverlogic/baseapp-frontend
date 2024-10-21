# @baseapp-frontend/components

## 0.0.9

### Patch Changes

- Add Messages module with SendMessage input for messages
- Make the previus comment input a reusable component to be used in comments and messages
- Reorganize modules to break previus social folder into comments, messages and __shared__
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
