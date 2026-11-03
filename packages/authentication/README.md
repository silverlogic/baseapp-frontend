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

Invalidates the authenticated user's data and Multi-Factor Authentication (MFA) data in cache, and removes the user's token cookie.

#### **Returns**

- `logout`
  - This is a function that, when called, performs the logout operation.

#### **Usage**

- `useLogout` usage example:

```jsx
const logout = useLogout()

return <button onClick={logout}>Logout</button>
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

On success it invalidates the active methods query. The mutation's `data` is `{ backupCodes }`. `MfaConfirmationResponse` also types optional `access` and `refresh` tokens for backends that issue new JWTs once a method is activated, but the hook does not store them (`baseapp_auth` does not send them); read them in `options.onSuccess` if your backend does.

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

### **useMfaChangePrimaryMethod**

Makes another of the user's active MFA methods the primary one (the method used at login). The backend checks `code` against the method that becomes primary, so request a code for it first (see `useMfaRequestCode`). On success it invalidates the active methods query, so `useMfaActiveMethods` refetches the new `isPrimary` flags.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that changes the primary method. By default, it's an empty object {}.
- `ApiClass` (optional)
  - An object with a `changePrimaryMethod({ method, code })` function, to call a different endpoint. Defaults to `MfaApi`.

#### **Returns**

- `mutation`
  - This object contains methods and data related to the mutation. Check [React Query's useMutation documentation](https://react-query.tanstack.com/reference/useMutation) for all available properties.

#### **Usage**

- `useMfaChangePrimaryMethod` usage example:

```jsx
const { mutate: changePrimaryMethod } = useMfaChangePrimaryMethod({
  options: { onSuccess: () => sendToast('Primary method updated') },
})

changePrimaryMethod({ method: 'app', code: 'code-from-the-app' })
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

### **useMfaRegenerateBackupCodes**

Replaces the backup codes of an active MFA method and returns the new ones. The old codes stop working, so show the new codes to the user right away. Backup codes are not part of the active methods query, so it does not invalidate it.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that regenerates the backup codes. By default, it's an empty object {}.
- `ApiClass` (optional)
  - An object with a `regenerateBackupCodes({ method, code })` function, to call a different endpoint. Defaults to `MfaApi`.

#### **Returns**

- `mutation`
  - This object contains methods and data related to the mutation; `data` is `{ backupCodes: string[] }` once it succeeds. Check [React Query's useMutation documentation](https://react-query.tanstack.com/reference/useMutation) for all available properties.

#### **Usage**

- `useMfaRegenerateBackupCodes` usage example:

```jsx
const { mutate: regenerateBackupCodes, data } = useMfaRegenerateBackupCodes()

// `code` can be left out when the backend's `configuration.confirmRegenerationWithCode` is false
regenerateBackupCodes({ method: 'email', code: 'your-code' })

return data?.backupCodes.map((backupCode) => <p key={backupCode}>{backupCode}</p>)
```

### **useMfaRequestCode**

Asks the backend to send a new code for an active MFA method, for example before confirming a protected action (deactivating a method, regenerating backup codes or changing the primary method) with an email or SMS method. Without a `method` the code goes to the user's primary method. Sending a code does not change the active methods, so it does not invalidate any query.

> **Do not call it for an authenticator app (`app`).** There is nothing to send, because the code comes from the app, and the backend answers with the method's provisioning URI (`otpauth://...?secret=...`) in `details`. That URI holds the shared TOTP secret, so it must never be shown (for example in a toast built from `data.details`) or logged. Pass an explicit `email` or `sms_twilio` method, and skip the call when the method, or the primary method when you pass none, is `app`.

#### **Parameters**

- `options` (optional)
  - This object is used to provide additional configuration to the useMutation hook from react-query that requests the code. By default, it's an empty object {}.
- `ApiClass` (optional)
  - An object with a `sendCode({ method })` function, to call a different endpoint. Defaults to `MfaApi`.

#### **Returns**

- `mutation`
  - This object contains methods and data related to the mutation; `data` is the backend's `{ details }` message. Check [React Query's useMutation documentation](https://react-query.tanstack.com/reference/useMutation) for all available properties.

#### **Usage**

- `useMfaRequestCode` usage example:

```jsx
const { mutate: requestCode, isPending } = useMfaRequestCode()

// send a code to the email method
requestCode({ method: 'email' })

// or to the primary method, when it is not `app`
requestCode()
```

### **MfaApi**

The MFA hooks call `MfaApi` by default. Its endpoints are the ones `baseapp_auth` mounts under `/auth/mfa/` (django-trench); pass your own `ApiClass` to a hook when your backend serves them elsewhere.

| Method | Request |
| --- | --- |
| `activate({ method })` | `POST /auth/mfa/<method>/activate/` |
| `confirmActivation({ method, code })` | `POST /auth/mfa/<method>/activate/confirm/` |
| `deactivate({ method, code? })` | `POST /auth/mfa/<method>/deactivate/` |
| `regenerateBackupCodes({ method, code? })` | `POST /auth/mfa/<method>/codes/regenerate/` |
| `changePrimaryMethod({ method, code })` | `POST /auth/mfa/change-primary-method/` |
| `sendCode({ method? })` | `POST /auth/mfa/code/request/` |
| `getActiveMethods()` | `GET /auth/mfa/user-active-methods/` |
| `getConfiguration()` | `GET /auth/mfa/config/` |
