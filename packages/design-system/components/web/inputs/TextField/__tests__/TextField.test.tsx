import { MenuItem, ThemeProvider, createTheme } from '@mui/material'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UseFormReturn, useForm } from 'react-hook-form'

import TextField from '..'

type FormValues = { fruit: string }

const SelectForm = ({
  onForm,
  onChange,
}: {
  onForm: (form: UseFormReturn<FormValues>) => void
  onChange?: (...args: unknown[]) => void
}) => {
  const form = useForm<FormValues>({ defaultValues: { fruit: '' } })
  onForm(form)
  return (
    <TextField
      select
      label="Fruit"
      name="fruit"
      control={form.control}
      onChange={onChange}
      isResponsive={false}
    >
      <MenuItem value="apple">Apple</MenuItem>
      <MenuItem value="banana">Banana</MenuItem>
    </TextField>
  )
}

describe('TextField select with a form control', () => {
  it('stores the chosen option value in the form', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    let form: UseFormReturn<FormValues> | undefined
    render(
      <ThemeProvider theme={createTheme()}>
        <SelectForm
          onForm={(value) => {
            form = value
          }}
          onChange={onChange}
        />
      </ThemeProvider>,
    )

    await user.click(screen.getByRole('combobox'))
    await user.click(await screen.findByRole('option', { name: 'Banana' }))

    await waitFor(() => expect(form!.getValues('fruit')).toBe('banana'))
    expect(screen.getByRole('combobox').textContent).toBe('Banana')
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
