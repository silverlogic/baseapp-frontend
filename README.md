# @baseapp-frontend

This is the baseapp-frontend monorepo that contains our apps and packages.

So, everything inside `packages` are meant to be part of the `@baseapp-frontend` packages, for instance:

```
- /packages
     -/core
     -/tsconfig
```

In that case, both `core` and `tsconfig` are unique packages, but they all belong to the `@baseapp-frontend` organization.

If one of the apps want to consume any package feature, we could simply add that package as a dependency like that:

```
  "dependencies": {
    "@baseapp-frontend/core": "*",
    ...
  },
```

And then just import the feature needed:

```jsx
import { useUser } from '@baseapp-frontend/core'

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

- `docs`: a app to document some packages's features
- `core`: core of utilities like `auth hooks`, `permisisons system` and `util functions`
- `config`: reusable configurations for `eslint`, `prettier` and `jest`
- `tsconfig`: reusable typescript configs

## NVM

This step is optional but it is highly suggested you to use NVM.

Instalation instructions can be found here: https://github.com/nvm-sh/nvm#installing-and-updating

Once installed run:

```bash
nvm use
```

## Setup

This repository uses `yarn`, so you make sure to have it installed:

- [installing yarn](https://yarnpkg.com/en/docs/install)

To install all apps and packages dependencies, run the following command:

```bash
cd baseapp-frontend
yarn install
```

## Build

To build all apps and packages, run the following command:

```bash
cd baseapp-frontend
yarn run build
```

## Develop

To develop all apps and packages, run the following command:

```bash
cd baseapp-frontend
yarn run dev
```

## Packages Versioning and Publishing

We have 3 mandatory steps before pushing modifications:

1. If we did any modification in any `package`, before pushing we need to generate a changeset, that basically is a file that summarize which type of changes we did (major, minor or none) alongside with the summary of those changes. So, to do that we run:

```bash
yarn changeset
```

After that, we need to choose which packages were changed, the bump they had and write the summary for that change.

2. With the changesets created, we need to consume them to actually increase the packages version accordingly. So, we do:

```bash
yarn version-packages
```

After running that, you might notice version bumps on the package's `version` and an update on the package's `CHANGELOG.md`.

3. By now, we just need to commit & push those files and, after merging the PR, the `packages updates` will be automatically published :)

## Storybook

How to run:

```bash
yarn storybook
```

### Paths for stories files

Path for stories file:

```bash
...components/MyComponentFolder/stories.@(js|jsx|ts|tsx)
```

### Basic skeleton for a Storybook stories file

```bash
import type { Meta, StoryObj } from '@storybook/react'
import { MY_COMPONENT } from 'MY_COMPONENT_PATH'

const meta: Meta<typeof MY_COMPONENT> = {
  title: 'TITLE_OF_THE_FOLDER_SHOWN_ON_STORYBOOK',
  component: MY_COMPONENT,
}

export default meta
type Story = StoryObj<typeof MY_COMPONENT>

export const NAME_OF_COMPONENT_TO_BE_SHOWN_ON_STORYBOOK: Story = {
  args: {
    DEFAULT_PROPS_FOR_COMPONENT for example:
    label: 'My Default Label'
  },
}
```

## Demo

Example on how it's being used on this app:

https://www.loom.com/share/5ab78c9cae6b4361a1381bf974e0eb67
