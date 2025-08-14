# @baseapp-frontend

This is the baseapp-frontend monorepo that contains our apps and packages.

So, everything inside `packages` is meant to be part of the `@baseapp-frontend` packages, for instance:

```
- /packages
     -/authentication
     -/tsconfig
```

In that case, both `authentication` and `tsconfig` are unique packages, but they all belong to the `@baseapp-frontend` organization.

If one of the apps wants to consume any package feature, we could simply add that package as a dependency like this:

```
  "dependencies": {
    "@baseapp-frontend/authentication": "*",
    ...
  },
```

And then just import the feature needed:

```jsx
import { useJWTUser } from '@baseapp-frontend/authentication'

export default function Docs() {
  const {user} = useJWTUser()

  return (
    <div>
      <h1>Find User</h1>
      <p>{user.firstName}<p>
    </div>
  )
}
```

## Apps and Packages

- `authentication`: includes authentication modules such as `login`, `signup`, `reset password`, `multifactor authentication` and more.
- `config`: includes reusable configurations for `eslint`, `prettier` and `jest`.
- `components`: includes BaseApp modules such as `comments`, `notifications`, `messages` and more.
- `design-system-mui`: defines our `design system configuration `(e.g. color pallete, typography, spacings, etc). It also shares reusable `components` that make up the design system as a whole.
- `docs`: an app to document some packages's features.
- `graphql`: includes `GraphQL`'s configurations and utilities.
- `provider`: includes provider of different kinds that have "use client" directive on top.
- `test`: extends `React Testing Library` features and export some util functions, mocks and test configurations.
- `tsconfig`: reusable `typescript configs`.
- `utils`: includes `constants`, `functions`, `hooks` and `types` that are generic enough to be reused between apps and packages.

## NVM

This step is optional but it is highly suggested you use NVM.

Installation instructions can be found here: https://github.com/nvm-sh/nvm#installing-and-updating

Once installed run:

```bash
nvm use
```

## **Setup**

This repository uses `pnpm` for package management. Ensure you have it installed:

- [Installing pnpm](https://pnpm.io/installation)

To install all dependencies for apps and packages, run the following command at the root of the repository:

```bash
pnpm install
```

## Build

To build all apps and packages, run the following command:

```bash
pnpm build

# build only the authentication package
pnpm build --filter=@baseapp-frontend/authentication
```

## Develop

Our development mode is designed to provide immediate feedback as you work on our monorepo apps and packages. In dev mode, each package automatically watches for changes in its source files, rebuilds itself using a custom build process, and synchronizes its output (bundled code, type declarations, etc.) to the consumer app.

This ensures that any changes you make are quickly reflected in the running application without the need to manually rebuild or restart servers.

### What Happens in Dev Mode

Some of our packages—like `@baseapp-frontend/components` and `@baseapp-frontend/design-system`—have a multi-step build process. When you run:

```bash
pnpm dev
```

Each package in our monorepo enters a persistent watch mode.

For example, when running dev mode for `@baseapp-frontend/components`, you might see output similar to the following:
```bash
[@baseapp-frontend/components] Waiting for other packages to start...  # wait for other dependencies to be build
[@baseapp-frontend/components] Starting build process...               # start the build process
[@baseapp-frontend/components] Running Relay Compiler...               # since this package uses relay, run the relay compiler
[@baseapp-frontend/components] Relay compilation completed.
[@baseapp-frontend/components] Running Babel transpiling...            # run babel step to transpile the code
[@baseapp-frontend/components] Babel transpilation completed.
[@baseapp-frontend/components] Running tsup bundling...                # run tsup step to bunle the code
[@baseapp-frontend/components] Running type declaration generation...  # run tsc step to create type declarations
[@baseapp-frontend/components] tsup Bundling completed.
[@baseapp-frontend/components] Type declarations generated.
[@baseapp-frontend/components] Copying DTS files...                    # merge the declaration files with the bundled files
[@baseapp-frontend/components] DTS files copied.
[@baseapp-frontend/components] Cleaning temporary files...             # remove temporary folders
[@baseapp-frontend/components] Temporary files cleaned.
[@baseapp-frontend/components] Build completed successfully.           # build completed
[@baseapp-frontend/components] Syncing dist folder to consumer app...  # sync the build output with the consumer app (baseapp-frontend-template)
[@baseapp-frontend/components] Sync completed successfully.
```
**Disclaimer**

The dev mode is a powerful tool that makes live testing of changes very convenient by automatically rebuilding packages as you edit files.

However, note that for packages like `@baseapp-frontend/design-system` and `@baseapp-frontend/components`, the watch process can trigger multiple build tasks upon every file change.

This continuous rebuild may lead to increased memory consumption and CPU usage if you’re making a lot of simultaneous changes.

It is recommended to use this live mode only at appropriate times rather than throughout your entire development phase.


## **PNPM Catalog Overview**

This monorepo manages some dependencies using pnpm catalogs. As a rule of thumb, we often add dependencies to the catalogs that are reused across multiple packages, rather than arbitrarily adding dependencies to these lists. This approach ensures that shared dependencies are centrally managed and consistently applied across the codebase.

Cataloging reused dependencies also facilitates easier updates and reduces the chance of dependency mismatches between different parts of the monorepo.

Make sure to keep [`@baseapp-frontend's catalog`](https://github.com/silverlogic/baseapp-frontend/blob/master/pnpm-workspace.yaml) always up to date.

### **Remove Catalog Entries**:

  Before using a package from GitHub, remove its catalog entry. This is necessary because pnpm doesn't handle catalogs well when using non-published versions. To remove the catalogs for all packages, run the following command:

  ```bash
  pnpm i # make sure the dependencies are installed
  pnpm replace-catalogs
  ```

### **Restore Catalog Entries**:

  To restore the catalog entries to their original state, run the following command:

  ```bash
  pnpm i # make sure the dependencies are installed
  pnpm restore-catalogs
  ```

  This will update all package.json files to include catalog entries again.

## **Using Package Versions from GitHub**

If you need to install a package version that hasn't been published yet, follow the steps below. We use GitHub as the source for unpublished versions.

### **Steps:**

1. **Remove Catalog Entries**:

  Refer to the (Remove Catalog Entries)[https://github.com/silverlogic/baseapp-frontend/blob/master/README.md#remove-catalog-entries] section above to temporarily remove catalogs for the relevant packages.

2. **Commit and Push**:

  After making the change, commit and push your code. This makes it easy to undo once the package has been published.

  ```bash
  git commit -m "Temporarily remove catalogs to use GitHub version"
  ```

3. **Copy the Commit Hash**:

  Push the code to GitHub and copy the last commit hash. You’ll need this hash to point your consumer app to the correct version of the package.   

4. **Update Consumer App**:

  In the consumer app (the app that will use the non-published version), update the package entry to the GitHub source. Replace `<commit-hash>` with the actual commit hash you copied:

  ```json
  "@baseapp-frontend/components": "git+https://github.com/silverlogic/baseapp-frontend.git#<commit-hash>&path:packages/components",
  ```

5. **Restore Catalog Entries and Merge**:

  Once you’ve finished testing or using the non-published version, you can restore the catalog entries in one of two ways:

  - Option 1: Run the `restore-catalogs` script

    Refer to the (Restore Catalog Entries)[https://github.com/silverlogic/baseapp-frontend/blob/master/README.md#restore-catalog-entries] section to reapply catalog entries.
  
  - Option 2: Revert the Commit

    Revert the commit that removed the catalogs to restore them to their previous state:

    ```bash
    git revert <commit-hash>
    ```

  Both options will effectively undo the catalog removal, restore the original entries, and allow you to proceed with committing and merging the changes.

## Packages Versioning and Publishing

We have 3 mandatory steps before pushing modifications:

1. If we did any modification in any `package`, before pushing we need to generate a changeset, which basically is a file that summarizes which type of changes we did (major, minor or none) alongside with the summary of those changes. So, to do that we run:

```bash
pnpm changeset
```

After that, we need to choose which packages were changed, and the bump they had and write the summary for that change.

2. With the changesets created, we need to consume them to actually increase the package versions accordingly. So, we do:

```bash
pnpm version-packages
```

After running that, you might notice version bumps on the package's `version` and an update on the package's `CHANGELOG.md`.

3. By now, we just need to commit & push those files and, after merging the PR, the `packages updates` will be automatically published :)

## Documentation Guide

To ensure that all pages, components, and utilities are thoroughly documented in Storybook, please follow these steps.

### 1. Write Storybook Stories

Each component and page should have a corresponding Storybook story that showcases its various states and usage scenarios:

- **Include All Possible States**: Each story should cover possible states of the component or page, such as default, disabled, loading, or error configurations.
- **Use Mocks for Data**: Use MSW (Mock Service Worker) to mock any necessary API requests, ensuring stories are self-contained and reproducible.
- **Decorators**: Pass any necessary decorators to simulate the environment (e.g., authentication with `withTokenSetup`).
- **Type Safety**: Ensure correct typings for all props and arguments.
- **Conciseness**: Be thorough but concise, focusing on the most relevant states and interactions.

**After creating the story**:
- Add the story name to `storySort` in the `preview.ts` file to ensure it appears in the correct order. If you’re unsure where to add this, please ask a COP member for assistance.

### 2. Add MDX Documentation

In addition to stories, create an MDX file to provide detailed documentation for each page or component:

- **Create an MDX File**: Place the `.mdx` file in the corresponding `__storybook__` folder. The file name should match the component or page name (e.g., `Button.mdx` for the `Button` component).
- **Use Consistent Titles**: Match the title in the MDX file to the Storybook story for consistency:
  - **Pages**: `@baseapp-frontend-template / Pages/[PageName]`
  - **Components**: `@baseapp-frontend-template / [ComponentSection]/[ComponentCategory]/[ComponentName]`

For detailed documentation templates and examples, refer to our [Tettra page](https://app.tettra.co/teams/TSL/pages/frontend-documentation).
