# BaseApp NextJS Core

This package holds all common logic and helpers that are used across different apps based on `baseapp-nextjs-template` 

Dependencies:
https://react-query.tanstack.com/
https://formik.org/

# Authentication

## useLogin

handle login form and execute the login

```js
const { formik, mutation } = useLogin({onError, onSuccess})
```

### Options

- `onError: (err, variables, context) => void`
	- Optional
	- It will be fired when an error happens when executing the login
- `onSuccess: (response, variables, context) => void`
	- Optional
	- Fired when login is successful

Both options are just an shortcut for [react-query's mutation's options](https://react-query.tanstack.com/reference/useMutation)

### Returns

- `formik` [formik's instance](https://formik.org/docs/api/useFormik) this is important to build the form's inputs and already handles the onSubmit behavior
- `mutation` [react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation) that can be used to execute the login at any time.

`formik` usage example:
```jsx
const { formik } = useLogin()
return <form onSubmit={formik.handleSubmit}>
  <InputField
    label="Email Address"
    name="email"
    type="email"
    placeholder="Email"
    formik={formik}
  />

  <PasswordField
    label="Password"
    name="password"
    formik={formik}
  />
	
  <button type="submit">Login</button>
</form>
```

`mutation` usage example, login after a successful signup:
```js
const { mutation: loginMutation } = useLogin()
useSignUp({
  onSuccess: (response, variables) => {
    loginMutation.mutate({
      email: variables.email,
      password: variables.password,
    })
  }
})
```

## useUser

Gets the current user and/or redirect user to another page if necessary

```js
const { user, isLoading } = useUser({redirectTo: '/auth/login', redirectIfFound: false})
```
### Options

 - `redirectTo`
	 - Optional
	 - path to send the visitor to
 - `redirectIfFound`
	 - Optional, defaults to `false`
	 - if `true` will redirect if the users is logged in
	 - if `false` will redirect if logged out

### Returns

- `user`user object returned by the API
- `isLoading` will be true if the user is being fetched from the API

## useLogout

```jsx
const logout = useLogout()
return <button onClick={() => logout()}>Logout</button>
```

### Returns

Returns a function to logout the user

# Forms

`baseapp-nextjs-core` provides some helper components for easy integration with [formik](https://formik.org/)

 1. InputField
 2. PasswordField
 3. CheckboxField
 4. ButtonWithLoading
 
```jsx
import { InputField, PasswordField, CheckboxField, ButtonWithLoading } from 'baseapp-nextjs-core'

<form onSubmit={formik.handleSubmit}>
<fieldset>
  <legend>Sign Up</legend>

  <InputField
    label="First Name"
    type="text"
    name="firstName"
    placeholder="First Name"
    formik={formik}
  />

  <InputField
    label="Last Name"
    type="text"
    name="lastName"
    placeholder="Last Name"
    formik={formik}
  />

  <InputField
    label="Email Address"
    type="email"
    name="email"
    placeholder="Email"
    formik={formik}
  />

  <InputField
    label="Phone"
    type="text"
    name="phoneNumber"
    placeholder="Number"
    formik={formik}
  />

  <PasswordField
    formik={formik}
  />

  <CheckboxField
    label="I agree to the Terms & Conditions"
    name="acceptConsent"
    formik={formik}
  />

  <ButtonWithLoading type="submit" formik={formik}>Sign Up</ButtonWithLoading>
</fieldset>
</form>
```

### InputField

- `component`
	- Optional, defaults to `input`
	- Can be string or react component, this will render the actual component
- `name`
	- **Required**
	- this prop will match the field in `formik` to handle its states and errors
- `label`
	- Optional
	- field's friendly label
- `formik`
	- **Required**
	- formik's instance
- `helperText`
	- Optional

### Backend errors on form's fields:

```jsx
const mutation = useMutation(data => {
  return axios.post('/do-something', data)
}, {
  onError: (err: any, variables, context) => {
    formik.setErrors(err?.response?.data)
  },
  onSettled: (data, error, variables, context) => {
    formik.setSubmitting(false)
  }
})

const formik = useFormik({
  onSubmit: (values: any) => mutation.mutate(values),
})

```

# API

This package provides the [react-query](https://react-query.tanstack.com/) basic setup to be used with [baseapp-django](https://bitbucket.org/silverlogic/baseapp-django-v2/src). 

#  Setup on a bare-bones project

```bash
yarn add git+https://alisson:CQ5M7thUNtvqSeKcNW62@bitbucket.org/silverlogic/baseapp-nextjs-core.git
```
Then mount `BaseAppProvider` in your main app component:
```jsx
import { BaseAppProvider } from 'baseapp-nextjs-core'

function App({ Component, pageProps }: AppProps) {
  return <BaseAppProvider>
    <Component {...pageProps} />
  </BaseAppProvider>
}
```