import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'

import PhoneNumberField from '..'
import ThemeTestProvider from '../../../../../tests/web/utils/ThemeTestProvider'

const consoleErrors = () => vi.mocked(console.error).mock.calls.flat().map(String).join(' ')

const Harness = ({
  onSubmit,
  onInputChange,
}: {
  onSubmit: (values: { phone: string }) => void
  onInputChange?: () => void
}) => {
  const form = useForm({ defaultValues: { phone: '' } })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <PhoneNumberField
        label="Phone"
        name="phone"
        control={form.control}
        defaultCountry="us"
        onInputChange={onInputChange}
      />
      <button type="submit">Save</button>
    </form>
  )
}

const renderHarness = (props: Parameters<typeof Harness>[0]) =>
  render(
    <ThemeTestProvider>
      <Harness {...props} />
    </ThemeTestProvider>,
  )

describe('PhoneNumberField (controlled)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // React warns about an unknown prop only once per name, so this case runs first.
  it('does not warn about onInputChange when none is passed', () => {
    renderHarness({ onSubmit: vi.fn() })

    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(consoleErrors()).not.toContain('onInputChange')
  })

  it('submits the phone value without forwarding onInputChange to the input', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onInputChange = vi.fn()
    renderHarness({ onSubmit, onInputChange })

    const input = screen.getByLabelText('Phone')
    fireEvent.change(input, { target: { value: '+12025550123' } })
    expect(input).toHaveValue('+1 (202) 555-0123')

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledWith({ phone: '+12025550123' }, expect.anything())
    expect(onInputChange).not.toHaveBeenCalled()
    expect(consoleErrors()).not.toContain('onInputChange')
  })
})
