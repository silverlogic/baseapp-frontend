# @baseapp-frontend/design-system

## 0.0.26

### Patch Changes

- Add `CircledAvatar` and `FileUploadButton` components.

## 0.0.25

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.5

## 0.0.24

### Patch Changes

- Added Unarchive icon

## 0.0.23

### Patch Changes

- Add `InputProps` prop and a default `aria-label` to the input.

## 0.0.22

### Patch Changes

- Added Archive and Unread icons

## 0.0.21

### Patch Changes

- Change `SearchBar` to use `withController`.
- Add `illustrations` icons.
- Remove `NoMessagesIcon` icon.
- Updated dependencies
  - @baseapp-frontend/utils@3.0.4

## 0.0.20

### Patch Changes

- Create `Searchbar` component.
- Add `NoMessagesIcon` icon.
- Export `PureTextFieldProps` type.

## 0.0.19

### Patch Changes

- Added the Searchbar component

## 0.0.18

### Patch Changes

- Impose file size limits on Dropzones

## 0.0.17

### Patch Changes

- Storybook cleanup

## 0.0.16

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@3.0.3

## 0.0.15

### Patch Changes

- Add the AddIcon to the icons library

## 0.0.14

### Patch Changes

- Updated AvatarWithPlacehoder

## 0.0.13

### Patch Changes

- Change CommentTextField name to SocialTextField

## 0.0.12

### Patch Changes

- Use `AppRouterCacheProvider` from `@mui/material-nextjs` for emotion cache provider. Remove `NextAppDirEmotionCacheProvider` previous solution.
- Add common and reusable dependencies to the `pnpm` catalog.
- Update tsconfig to use `lib.json`.

- Updated dependencies
  - @baseapp-frontend/utils@3.0.0

## 0.0.11

### Patch Changes

- Added prop to hide/show border on TextareaField component

## 0.0.10

### Patch Changes

- Add NotificationBellIcon

## 0.0.9

### Patch Changes

- Improvements for the `Dropzone` component, such as fixing some styles and making it more reusable by adding dropzone props.

## 0.0.8

### Patch Changes

- Changed useLogoOverrides to use localStorage instead of cookies, moved project logo to design-system

## 0.0.7

### Patch Changes

- Modified typography font size and font height to match BA design system
- Added responsive font sizes for h6 in both MUI and Tailwind
- Moved `responsiveTypography` utility from `tailwind.config.js` to `/styles/tailwind/plugins`
- Added `OutlinedEditIcon` and `ShareIcon` components

## 0.0.6

### Patch Changes

- Added useLogoOverrides hook and Dropzone component to Design System
  Added getImageString to Utils pkg
- Updated dependencies
  - @baseapp-frontend/utils@2.5.5

## 0.0.5

### Patch Changes

- Export custom tailwind plugins to be reused.

## 0.0.4

### Patch Changes

- Minor adjustment to `CommentTextField`, focusing on enhancing accessibility.

## 0.0.3

### Patch Changes

- Add Storybook
- Create stories for `Iconography`, `Avatars`, `Buttons`, `Dialogs`, `Displays`, `Drawers`, `Popover`, `Form`, `Typography`, `Logo` and `Scrollbar`

## 0.0.2

### Patch Changes

- Move `Logo`, `Popover`, `avatars`, `icons` and `animate`, `usePopover` and `useResponsive` from template to package
- Updated dependencies
  - @baseapp-frontend/utils@2.5.4

## 0.0.1

### Patch Changes

- Change the package name to `@baseapp-frontend/design-system`.
- Move several ui components from the template to the package.
- Refactor ThemeProvider so it can be used on the template.
- Move several theme tokens, configurations, components overrides from the template to the package.
- Updated dependencies
  - @baseapp-frontend/utils@2.5.1

## 2.0.1

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.5.0

## 2.0.0

### Major Changes

- Update several dependencies.
- Add `SnackbarProvider` component. It provides a new toast bar system based on `material-ui` only.
- Removed deprecated `CheckboxField`, `PasswordField` and `TextField` components.
- Move `react`, `react-dom` and `@baseapp-frontend/utils` to `peerDependencies` for better compatibility between the packages and the consumer app.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/utils@2.4.0

## 1.5.1

### Patch Changes

- Ignore TS errors, probably caused by the `compilerOptions` update made by the `tsconfig v1.1.5` update.

## 1.5.0

### Minor Changes

- Update `@mui/material` and `@mui/icons-material` versions.

## 1.4.1

### Patch Changes

- Add `@types/react` and `@types/react-dom`.

- Updated dependencies
  - @baseapp-frontend/core@2.7.4

## 1.4.0

### Minor Changes

- Changes `ButtonWithLoading` props in order to remove `form`.
- Adds a generic type to `CheckboxField`.
- Creates `ThemeProvider` component.

### Patch Changes

- Updated dependencies
  - @baseapp-frontend/core@2.7.0

## 1.3.3

### Patch Changes

- 220d806: Add Element as label type for CheckboxProps

## 1.3.2

### Patch Changes

- 7ce48f9: Removing Module augmentation from MUI5

## 1.3.1

### Minor Changes

- Fixing CheckboxField error handling

## 1.3.0

### Minor Changes

- Adapted components to use react-hook-form

## 1.2.1

### Patch Changes

- Removed services as a default palette
- Fix issue on ImageUploader types

## 1.2.0

### Minor Changes

- Added CheckboxField

## 1.1.0

### Minor Changes

- Added TextField
- Added support to Formik (These will be changed in the future, just added to the sake of keep current baseapp-nextjs-mui-template working)

## 1.0.1

### Patch Changes

- Updated package.json configs.

## 1.0.0

### Major Changes

- Created design-system-mui package
- Created following components:
  - ButtonWithLoading
  - ImageUploader (component used in WTF project)
  - PasswordField
