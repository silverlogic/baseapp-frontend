# Module: `navigations`

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

## `NavigationLayout` - Header and Sidebar Configuration

### `enableHeader` prop

The `enableHeader` prop on `NavigationLayout` controls whether the top `Header` component is rendered on desktop screens. It defaults to `true`.

- **`enableHeader={true}` (default):** The `Header` is rendered at the top of the page. `AccountMenu` and `NotificationsPopover` appear inside the header.
- **`enableHeader={false}`:** The `Header` is hidden on desktop. `AccountMenu` and `NotificationsPopover` are moved into the sidebar (`NavVertical` or `NavMini`) instead. On mobile and tablet devices, the header is always shown regardless of this setting.

### Passing `NotificationsPopover` and `AccountMenu`

When using an alternative layout (e.g., `enableHeader={false}`), you can pass `NotificationsPopover` and `AccountMenu` components to `NavigationLayout`. These components will be rendered at the bottom of the sidebar navigation.

```tsx
import { NavigationLayout } from '@baseapp-frontend/components/modules/navigations/web'

import AccountMenu from './AccountMenu'
import NotificationsPopover from './NotificationsPopover'

;<NavigationLayout
  enableHeader={false}
  navData={navData}
  AccountMenu={AccountMenu}
  AccountMenuProps={{ onLoginClick, onRegisterClick }}
  NotificationsPopover={NotificationsPopover}
  NotificationsPopoverProps={{ filters: myFilters }}
>
  {children}
</NavigationLayout>
```

When `enableHeader` is `false` and the layout is `vertical` or `mini`, the sidebar renders a `NavAccountSection` at the bottom containing both the `NotificationsPopover` and the `AccountMenu`.
