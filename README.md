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
import { useUser } from '@baseapp-frontend/authentication'

export default function Docs() {
  const {user} = useUser()

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
pnpm build --filter=authentication
```

## Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

## **PNPM Catalog Overview**

This monorepo manages some dependencies using pnpm catalogs. As a rule of thumb, we often add dependencies to the catalogs that are reused across multiple packages, rather than arbitrarily adding dependencies to these lists. This approach ensures that shared dependencies are centrally managed and consistently applied across the codebase.

Cataloging reused dependencies also facilitates easier updates and reduces the chance of dependency mismatches between different parts of the monorepo.

Make sure to keep [`@baseapp-frontend's catalog`](https://github.com/silverlogic/baseapp-frontend/blob/master/pnpm-workspace.yaml) always up to date.


## **Using Package Versions from GitHub**

If you need to install a package version that hasn't been published yet, follow the steps below. We use GitHub as the source for unpublished versions.

### **Steps:**

1. **Remove Catalog Entries**:

  Before using a package from GitHub, remove its catalog entry. This is necessary because pnpm doesn't handle catalogs well when using non-published versions. To remove the catalogs for the desired package, run the following command:

  ```bash
  # will replace catalogs for utils and authentication packages
  node replace-catalogs.js utils authentication

  # will replace catalogs for all packages
  node replace-catalogs.js
  ```

2. **Commit and Push**:

  After making the change, commit and push your code. This makes it easy to undo once the package has been published.

  ```bash
  git commit -m "Temporarily remove catalogs to use GitHub version"
  ```

3. **Copy the Commit Hash**:

  Push the code to GitHub and copy the last commit hash. You’ll need this hash to point your consumer app to the correct version of the package.   

4. **Update Consumer App**:

  In the consumer app (the app that will use the non-published version), update the package entry to point to the GitHub source. Replace `<commit-hash>` with the actual commit hash you copied:

  ```json
  "@baseapp-frontend/components": "git+https://github.com/silverlogic/baseapp-frontend.git#<commit-hash>&path:packages/components",
  ```

5. **Undo Changes and Merge**:

  Once you’ve finished testing or using the non-published version, undo the commit that removed the catalogs. You can now proceed with merging and publishing the changes.

  ```bash
  git revert <commit-hash>
  ```

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
