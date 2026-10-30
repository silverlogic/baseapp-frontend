# **`@baseapp-frontend/design-system`**

## **Overview**

This package defines our design system configuration (e.g. color pallete, typography, spacings, etc). It also shares reusable components that make up the design system as a whole.

## **What is in here?**

This package contains essential BaseApp modules such as `comments`, `notifications`, `messages` and `navigations`. It also includes Storybook, a tool for component documentation and visualization. To run the Storybook locally, run the following command:

```bash
# at root level

pnpm storybook --filter @baseapp-frontend/design-system
```

## **Component props**

Each component documents its props in an `.mdx` file next to it (`__storybook__/*.mdx`), shown in Storybook. Notes on props that change shared behaviour:

- **`Dialog` close button** (`components/web/dialogs`): when `onClose` is set, the icon-only close button gets `aria-label="Close dialog"`. Pass `closeButtonLabel` to replace it (for example a translated string), and `CloseButtonProps` to forward extra props to the button; its `onClick` runs before `onClose`. `ConfirmDialog` accepts both and passes them through. See `BaseDialog.mdx`.
- **`PhoneNumberField` under `withController`** (`components/web/inputs`): accepts `onInputChange` like the other controlled inputs and ignores it, so it never reaches the DOM. See `PhoneNumberField.mdx`.
