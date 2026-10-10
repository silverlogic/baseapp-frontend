import { ThemeProvider, createTheme } from '@mui/material'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import SelectField from '..'

const OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
]

let formValues: () => { language: string }

const Form = () => {
  const { control, getValues } = useForm({ defaultValues: { language: 'en' } })
  formValues = getValues
  return <SelectField control={control} name="language" label="Language" options={OPTIONS} />
}

describe('SelectField', () => {
  it('stores the selected option value in the form', async () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <Form />
      </ThemeProvider>,
    )

    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(within(screen.getByRole('listbox')).getByText('Español'))

    expect(formValues().language).toBe('es')
    expect(screen.getByRole('combobox').textContent).toBe('Español')
  })
})
