# @baseapp-frontend


This is the baseapp-frontend monorepo that contains our apps and packages.

So, everything inside `packages` are meant to be part of the `@baseapp-frontend` main package, for instance:
```
- /packages
     -/core
     -/tsconfig
```
In that case, both `core` and `tsconfig` are unique packages, but they all belong to the `@baseapp-frontend`.

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
