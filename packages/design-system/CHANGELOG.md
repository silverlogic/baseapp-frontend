# @baseapp-frontend/design-system

## 0.0.1

### Patch Changes

- Change the pakage name to `@baseapp-frontend/design-system`.
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
