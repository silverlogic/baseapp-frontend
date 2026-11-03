# **`@baseapp-frontend/authentication`**

## **Overview**

This package includes authentication modules such as login, signup, reset password, multifactor authentication and more.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/authentication
# or
yarn add @baseapp-frontend/authentication
# or
pnpm install @baseapp-frontend/authentication
```

## **What is in here?**

### **useLogin**

Handles login/mfa form and execute the login. Extends all ReactQuery's useMutation's options on `loginOptions` and `mfaOptions` fields.

#### **Parameters**

- `validationSchema` (optional)

  - This is a validation schema used with Yup, a JavaScript object schema validator and builder.
    The default value for validationSchema is `DEFAULT_VALIDATION_SCHEMA`.
    This schema is used to validate the form values before submission.

- `defaultValues` (optional)

  - This is an object representing the initial values for the form fields. The default value for defaultValues is DEFAULT_INITIAL_VALUES.

- `loginOptions` (optional)

  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the login request. By default, it's an empty object {}.

- `mfaOptions` (optional)
  - This object provides additional configuration to the useMutation hook that handles the second step of login, which is the Multi-Factor Authentication (MFA) request. By default, it's an empty object {}.

Both options are just an shortcut for [react-query's mutation's options](https://react-query.tanstack.com/reference/useMutation)

#### **Returns**

- `form` ([react-hook-form's instance](https://react-hook-form.com/api/useform))
  - This instance is important for building the form's inputs and already handles the onSubmit behavior.
- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the login at any time.
- `mfaForm` ([react-hook-form's instance](https://react-hook-form.com/api/useform))
  - This instance is utilized for the Multi-Factor Authentication (MFA) form. Like the form instance, it is used for creating the MFA form's inputs and handles the onSubmit behavior.
- `mfaMutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance is used for executing the MFA step of the login process when needed.

#### **Usage**

- `form` usage example:

```jsx
const { form } = useLogin()
return <form onSubmit={form.handleSubmit}>
  <InputField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Email"
    form={form}
  />

  <PasswordField
    label="Password"
    name="password"
    form={form}
  />

  <button type="submit">Login</button>
</form>
```

- `mutation` usage example, login after a successful signup:

```js
const { mutation: loginMutation } = useLogin()
useSignUp({
  onSuccess: (response, variables) => {
    loginMutation.mutate({
      email: variables.email,
      password: variables.password,
    })
  },
})
```

### **useRecoverPassword**

Handles password recovery form and sends a request for password recovery. Extends all ReactQuery's useMutation's options on `options` field.

#### **Parameters**

- `validationSchema` (optional)

  - This is a validation schema used with Yup, a JavaScript object schema validator and builder.
    The default value for validationSchema is `DEFAULT_VALIDATION_SCHEMA`.
    This schema is used to validate the form values before submission.

- `defaultValues` (optional)

  - This is an object representing the initial values for the form fields. The default value for defaultValues is DEFAULT_INITIAL_VALUES.

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the password recovery request. By default, it's an empty object {}.

#### **Returns**

- `form` ([react-hook-form's instance](https://react-hook-form.com/api/useform))
  - This instance is important for building the form's inputs and already handles the onSubmit behavior.
- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the password recovery at any time.

#### **Usage**

- `form` usage example:

```jsx
const { form } = useRecoverPassword()
return <form onSubmit={form.handleSubmit}>
  <InputField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Email"
    form={form}
  />

  <button type="submit">Recover password</button>
</form>
```

### **useResetPassword**

Handles password reset form and sends a request for password reset. Extends all ReactQuery's useMutation's options on `options` field.

#### **Parameters**

- `validationSchema` (optional)

  - This is a validation schema used with Yup, a JavaScript object schema validator and builder.
    The default value for validationSchema is `DEFAULT_VALIDATION_SCHEMA`.
    This schema is used to validate the form values before submission.

- `defaultValues` (optional)

  - This is an object representing the initial values for the form fields. The default value for defaultValues is DEFAULT_INITIAL_VALUES.

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the password reset request. By default, it's an empty object {}.

#### **Returns**

- `form` ([react-hook-form's instance](https://react-hook-form.com/api/useform))
  - This instance is important for building the form's inputs and already handles the onSubmit behavior.
- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the password reset at any time.

#### **Usage**

- `form` usage example:

```jsx
const { form } = useResetPassword()
return <form onSubmit={form.handleSubmit}>
  <PasswordField
    label="New Password"
    name="newPassword"
    form={form}
  />

  <InputField
    label="Reset Token"
    name="token"
    type="text"
    placeholder="Token"
    form={form}
  />

  <button type="submit">Reset password</button>
</form>
```

### **useSignUp**

Handles sign-up form and sends a request for registration. Extends all ReactQuery's useMutation's options on `options` field.

#### **Parameters**

- `validationSchema` (optional)

  - This is a validation schema used with Yup, a JavaScript object schema validator and builder.
    The default value for validationSchema is `DEFAULT_VALIDATION_SCHEMA`.
    This schema is used to validate the form values before submission.

- `defaultValues` (optional)

  - This is an object representing the initial values for the form fields. The default value for defaultValues is DEFAULT_INITIAL_VALUES.

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the registration request. By default, it's an empty object {}.

#### **Returns**

- `form` ([react-hook-form's instance](https://react-hook-form.com/api/useform))
  - This instance is important for building the form's inputs and already handles the onSubmit behavior.
- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the registration at any time.

#### **Usage**

- `form` usage example:

```jsx
const { form } = useSignUp()
return <form onSubmit={form.handleSubmit}>
  <InputField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Email"
    form={form}
  />

  <PasswordField
    label="Password"
    name="password"
    form={form}
  />

  <button type="submit">Sign up</button>
</form>
```

### **useLogout**

Invalidates the authenticated user's data and Multi-Factor Authentication (MFA) data in cache, and removes the user's token cookie. It also removes an impersonator's kept-aside tokens (see [Impersonation tokens](#impersonation-tokens)), so logging out during an impersonation session signs the impersonator out too. It does not end the session on the server, which stays active (and unaudited as ended) until it expires; to end it, call `useEndImpersonation` from `@baseapp-frontend/components` before logging out.

#### **Returns**

- `logout`
  - This is a function that, when called, performs the logout operation.

#### **Usage**

- `useLogout` usage example:

```jsx
const logout = useLogout()

return <button onClick={logout}>Logout</button>
```

### **Impersonation tokens**

Plain functions that swap the stored JWT pair when an impersonation session starts and ends.
`@baseapp-frontend/components`' `useStartImpersonation` and `useEndImpersonation` call them for
you; use them directly only when you start or end sessions some other way (for example over REST).

| Function | What it does |
|---|---|
| `swapInImpersonationTokens({ access, refresh })` | Keeps the current pair aside (under `ImpersonatorAuthorization` / `ImpersonatorRefresh`), stores the session's pair under the regular names and removes the current-profile cookie. A pair kept aside earlier (left by a session never ended in this browser) is replaced, unless the current pair is itself a session's. |
| `restoreImpersonatorTokens()` | Puts the kept-aside pair back, removes the kept-aside copy and the current-profile cookie. Resolves `false`, leaving the session's pair in place, when no complete pair was kept aside. |
| `clearImpersonatorTokens()` | Removes the kept-aside pair. |
| `hasImpersonatorTokens()` | Whether a pair is kept aside, i.e. whether this client is in a session. |
| `isImpersonationSessionToken(token)` | Whether a JWT was issued for an impersonation session (carries the backend's `imp_sid` claim). Only decodes it: a session's token stays one after the session ends. |

Each but `isImpersonationSessionToken` takes optional key names: `accessKeyName`, `refreshKeyName`
(as `useLogin`), `impersonatorAccessKeyName` and `impersonatorRefreshKeyName`. `useLogin` removes a
kept-aside pair once a login succeeds, so tokens left by an earlier session never outlive the
next sign-in.

After a swap, everything cached for the previous user (React Query, the Relay store) is stale:
reload the app or recreate those caches.

```ts
import { restoreImpersonatorTokens, swapInImpersonationTokens } from '@baseapp-frontend/authentication'

await swapInImpersonationTokens({ access, refresh })
window.location.assign('/')

// later
const restored = await restoreImpersonatorTokens()
if (!restored) await logout()
window.location.assign('/')
```

### **useMfaActivate**

This hook uses the activate method from the `MfaApi` to activate Multi-Factor Authentication (MFA) for a user.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the MFA activation request. By default, it's an empty object {}.

#### **Returns**

- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the MFA activation at any time.

#### **Usage**

- `useMfaActivate` usage example:

```jsx
const { mutation: mutate: { activateMfa } } = useMfaActivate()

activateMfa.mutate({ method: 'your-method' })
```

### **useMfaActivateConfirm**

Handles MFA activation confirmation by validating and submitting the form. It extends all ReactQuery's useMutation's options.

#### **Parameters**

- `method`

  - This is the MFA method that the user selected for activation.

- `validationSchema` (optional)

  - This is a validation schema used with Yup, a JavaScript object schema validator and builder.
    The default value for validationSchema is `CODE_VALIDATION_SCHEMA`.
    This schema is used to validate the form values before submission.

- `defaultValues` (optional)

  - This is an object representing the initial values for the form fields. The default value for defaultValues is `CODE_VALIDATION_INITIAL_VALUES`.

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that handles the MFA activation confirmation. By default, it's an empty object {}.

#### **Returns**

- `form` ([react-hook-form's instance](https://react-hook-form.com/api/useform))

  - This instance is important for building the form's inputs and already handles the onSubmit behavior.

- `mutation` ([react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation))
  - This instance can be used to execute the MFA activation confirmation at any time.

#### **Usage**

- `useMfaActivateConfirm` usage example:

```jsx
const { form, mutation: { activateMfaConfirm } } = useMfaActivateConfirm({ method: 'your-method' })

return <form onSubmit={form.handleSubmit}>
  <InputField
    label="Code"
    name="code"
    form={form}
  />

  <button type="submit">Confirm MFA Activation</button>
</form>
```

### **useMfaActiveMethods**

Handles the fetching of the active MFA methods for the current user.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useQuery hook from react-query that fetches the MFA active methods. By default, it's an empty object {}.
  - `enabled` (optional)
    - This is a boolean that defines if the query should run automatically when the component mounts. The default value is true.

#### **Returns**

- `activeMethods`

  - This array contains the active MFA methods for the current user.

- `...rest` (All remaining properties from useQuery's result)
  - These include properties like `isLoading`, `isError`, `error`, `status`, etc. Check [React Query's useQuery documentation](https://react-query.tanstack.com/reference/useQuery) for all available properties.

#### **Usage**

- `useMfaActiveMethods` usage example:

```jsx
const { activeMethods, isLoading, isError, error } = useMfaActiveMethods()

if (isLoading) {
  return <div>Loading...</div>
}

if (isError) {
  return <div>An error has occurred: {error.message}</div>
}

return (
  <div>
    Active MFA Methods:
    {activeMethods.map((method) => (
      <p key={method}>{method}</p>
    ))}
  </div>
)
```

### **useMfaConfiguration**

Handles fetching the MFA configuration for the current user.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useQuery hook from react-query that fetches the MFA configuration. By default, it's an empty object {}.
  - `enabled` (optional)
    - This is a boolean that defines if the query should run automatically when the component mounts. The default value is true.

#### **Returns**

- `configuration`

  - This object contains the MFA configuration for the current user.

- `...rest` (All remaining properties from useQuery's result)
  - These include properties like `isLoading`, `isError`, `error`, `status`, etc. Check [React Query's useQuery documentation](https://react-query.tanstack.com/reference/useQuery) for all available properties.

#### **Usage**

- `useMfaConfiguration` usage example:

```jsx
const { configuration, isLoading, isError, error } = useMfaConfiguration()

if (isLoading) {
  return <div>Loading...</div>
}

if (isError) {
  return <div>An error has occurred: {error.message}</div>
}

return (
  <div>
    MFA Configuration:
    <p>{configuration.methods}</p>
  </div>
)
```

### **useMfaDeactivate**

Handles the deactivation of a Multi-Factor Authentication (MFA) method for the current user.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that performs the MFA deactivation. By default, it's an empty object {}.

#### **Returns**

- `mutation`
  - This object contains methods and data related to the mutation. It includes `mutate`, `mutateAsync`, `isLoading`, `isError`, `error`, `status`, and more. Check [React Query's useMutation documentation](https://react-query.tanstack.com/reference/useMutation) for all available properties.

#### **Usage**

- `useMfaDeactivate` usage example:

```jsx
const { mutate: deactivateMfa } = useMfaDeactivate()

// to deactivate a method
deactivateMfa.mutate({ method: 'your-method', code: 'your-code' })
```
