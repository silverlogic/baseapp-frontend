# **`@baseapp-frontend/design-system`**

## **Overview**

This package defines our design system configuration (e.g. color pallete, typography, spacings, etc). It also shares reusable components that make up the design system as a whole.

## **What is in here?**

This package contains essential BaseApp modules such as `comments`, `notifications`, `messages` and `navigations`. It also includes Storybook, a tool for component documentation and visualization. To run the Storybook locally, run the following command:

```bash
# at root level

pnpm storybook --filter @baseapp-frontend/design-system
```

## **Build Process**

We use a hybrid build pipeline combining `tsup`, and `TypeScript Compiler` to balance type accuracy and modern bundling:

1. **Source Code:** Original TypeScript/React files.

2. **tsup Bundling:**

    * Bundling tool (using esbuild) consumes the `components`, `hooks`, `layouts`, `providers`, `styles` and `utils` modules.

    * Generates ESM and CJS bundles in `dist`.

3. **TypeScript Compiler (tsc):**

    * Runs in parallel to generate .d.ts type declarations.

    * Outputs declarations to `tmp-dts`.

4. **Merge Outputs:**

    * Copies type declarations from `tmp-dts` to `dist`.

    * Final `dist` contains both runtime bundles and accurate type definitions.
