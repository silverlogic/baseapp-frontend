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
