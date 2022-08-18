# `core`

This package holds all common logic and helpers that are used across different apps based on `baseapp-nextjs-template` 

Dependencies:
https://react-query.tanstack.com/
https://react-hook-form.com/

# Authentication

## useLogin

handle login form and execute the login

```js
const { form, mutation } = useLogin({onError, onSuccess})
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

- `form` [react-hook-form's instance](https://react-hook-form.com/api/useform) this is important to build the form's inputs and already handles the onSubmit behavior
- `mutation` [react-query's mutation instance](https://react-query.tanstack.com/reference/useMutation) that can be used to execute the login at any time.

`form` usage example:
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


### Backend errors on form's fields:

```jsx
const mutation = useMutation(data => {
  return axios.post('/do-something', data)
}, {
  onError: (err: any, variables, context) => {
    form.setError('fieldName', {type: 'custom', message: err?.response?.data})
  },
  onSettled: (data, error, variables, context) => {
    form.reset()
  }
})

const form = useForm()
const handleSubmit = form.handleSubmit((values: any) => mutation.mutate(values))

```

# API

This package provides the [react-query](https://react-query.tanstack.com/) basic setup to be used with [baseapp-django](https://bitbucket.org/silverlogic/baseapp-django-v2/src). 

#  Setup on a bare-bones project

```bash
yarn add @baseapp-frontend/core
```
Then mount `BaseAppProvider` in your main app component:
```jsx
import { BaseAppProvider } from '@baseapp-frontend/core'

function App({ Component, pageProps }: AppProps) {
  return <BaseAppProvider>
    <Component {...pageProps} />
  </BaseAppProvider>
}
```