# **`@baseapp-frontend/test`**

## **Overview**

This package extends React Testing Library features and export some util functions, mocks and test configurations.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/test
# or
yarn add @baseapp-frontend/test
# or
pnpm install @baseapp-frontend/test
```

## **Setup**

In order to use this package you will need to:

- create `__mocks__` folder at the root level and add these three files inside it:

  - consoleMock.ts

    ```ts
    module.exports = require('@baseapp-frontend/test/__mocks__/consoleMock.ts')

    export {}
    ```

  - fileMock.ts

    ```ts
    module.exports = require('@baseapp-frontend/test/__mocks__/fileMock.ts')

    export {}
    ```

  - styleMock.ts

    ```ts
    module.exports = require('@baseapp-frontend/test/__mocks__/styleMock.ts')

    export {}
    ```

- create a `jest.config.ts` at the root level
  ```ts
  module.exports = require('@baseapp-frontend/test/jest.config.ts')
  ```

In order to test other `@baseapp-frontend`'s packages like `authentication` or if you are using `@baseapp-frontend/test` outside this monorepo, you may need to also install these additional dependencies (they're also present in the `@baseapp-frontend/test` dependencies, so make sure to install the same versions):

- install dependencies

```bash
  yarn add -D babel-jest@^29.7.0 jest@^29.7.0 jest-environment-jsdom@^29.7.0 ts-jest@^29.1.4 ts-node@^10.9.2 @types/jest@^29.5.12 @testing-library/jest-dom@^6.4.6 @testing-library/react@^16.0.0 @testing-library/user-event@^14.5.2
```

## **What is in here?**

- All exported features from '@testing-library/react', '@testing-library/jest-dom' and '@testing-library/user-event'
- Mock utils like `cookiesMock` and `axiosMock`.

## **Usage**

```jsx
import useLogin from '@baseapp-frontend/authentication'
import { ComponentWithProviders, axiosMock, renderHook } from '@baseapp-frontend/test'

describe('useLogin', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/auth/login').reply(200, {
      token: 'fake cookie',
    })

    const email = 'test@tsl.io'
    const password = '123456789'

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useLogin({
          defaultValues: {
            email,
            password,
          },
          loginOptions: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })
})
```
