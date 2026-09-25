---
"@baseapp-frontend/components": patch
---

Allow scrolling through long biographies on native profile screens. `ProfileComponent` rendered inside a non-scrolling `PageViewWithHeader`, so a long bio pushed the Edit/Share actions below the screen edge with no way to reach them. It now renders in the design-system `ScrollView` (`avoidKeyboard={false}`, since the screen has no inputs), with the horizontal and bottom padding moved to a `flexGrow: 1` content container so short profiles still fill the screen.
