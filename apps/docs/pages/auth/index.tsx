import { axios, useLogin } from '@baseapp-frontend/core'
import { ButtonWithLoading, PasswordField, TextField } from '@baseapp-frontend/design-system-mui'

import { Divider, useTheme } from '@mui/material'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axios)

export default function Auth() {
  const { form, mutation } = useLogin({
    onSuccess: () => alert('Logged in successfully!'),
    onError: (error: { response?: { data?: any } }) =>
      alert(`Errors returned: ${JSON.stringify(error?.response?.data)}`),
  })
  const theme = useTheme()

  const mockForSuccessAndLogIn = (e: any) => {
    e.preventDefault()
    axiosMock.onPost('/login').reply(
      (_config) =>
        new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve([200, {}])
          }, 2000)
        }),
    )
    form.handleSubmit()
  }

  const mockForErrorAndLogIn = () => {
    axiosMock
      .onPost('/login')
      .reply(400, { email: ['Testing Api Error'], password: ['Wrong Password'] })
    form.handleSubmit()
  }

  return (
    <div>
      <h1>Auth demo</h1>
      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <form
        onSubmit={mockForSuccessAndLogIn}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
      >
        <TextField name="email" label="Email" form={form} sx={{ marginBottom: '14px' }} />
        <PasswordField name="password" label="Password" form={form} sx={{ marginBottom: '14px' }} />
        <div style={{ display: 'flex' }}>
          <ButtonWithLoading
            variant="contained"
            type="submit"
            form={form}
            fullWidth
            sx={{ marginRight: '8px' }}
          >
            Log in (Success)
          </ButtonWithLoading>
          <ButtonWithLoading
            variant="contained"
            color="error"
            type="button"
            onClick={mockForErrorAndLogIn}
            form={form}
            fullWidth
          >
            Log in (Error)
          </ButtonWithLoading>
        </div>
      </form>

      <div>
        <h2>Mutation state: {mutation.status}</h2>
      </div>
    </div>
  )
}
