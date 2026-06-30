import { render, userEvent } from '@baseapp-frontend/test'

import withController from '..'

const mockFieldOnChange = jest.fn()
const mockFieldOnBlur = jest.fn()

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render: r }: { render: any }) =>
    r({
      field: {
        onChange: mockFieldOnChange,
        onBlur: mockFieldOnBlur,
      },
      fieldState: {},
    }),
}))

describe('withController', () => {
  const TestComponent = (props: any) => <input data-testid="test-input" {...props} />
  const WrappedComponent = withController(TestComponent)

  it('should render the Controller component if control prop is provided', () => {
    const { queryByTestId } = render(<WrappedComponent name="test" control={{}} />)
    expect(queryByTestId('test-input')).toBeInTheDocument()
  })

  it('should directly render the passed component if control prop is not provided', () => {
    const { queryByTestId } = render(<WrappedComponent name="test" helperText="some helper" />)
    const testComponent = queryByTestId('test-input')

    expect(testComponent).toHaveAttribute('name', 'test')
    expect(testComponent).toHaveAttribute('helperText', 'some helper')
  })

  it('should pass down the correct props', () => {
    const { queryByTestId } = render(
      <WrappedComponent name="test" someProp="prop" control={{}} helperText="some helper" />,
    )
    const testComponent = queryByTestId('test-input')

    expect(testComponent).toHaveAttribute('name', 'test')
    expect(testComponent).toHaveAttribute('someProp', 'prop')
    expect(testComponent).toHaveAttribute('helperText', 'some helper')
  })

  it("should trigger the passed onChange function and the built-in Controller's onChange when the component's onChange is called", async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()
    const { findByTestId } = render(
      <WrappedComponent name="test" control={{}} onChange={mockOnChange} />,
    )

    const testComponent = await findByTestId('test-input')
    await user.type(testComponent, 'test')

    expect(mockOnChange).toHaveBeenCalledTimes(4)
    expect(mockFieldOnChange).toHaveBeenCalledTimes(4)
  })

  it("should trigger the passed onBlur function and the built-in Controller's onBlur when the component's onBlur is called", async () => {
    const user = userEvent.setup()
    const mockOnBlur = jest.fn()
    const { findByTestId } = render(
      <WrappedComponent name="test" control={{}} onBlur={mockOnBlur} />,
    )

    const testComponent = await findByTestId('test-input')
    await user.type(testComponent, 'test')
    await user.tab()

    expect(mockOnBlur).toHaveBeenCalledTimes(1)
    expect(mockFieldOnBlur).toHaveBeenCalledTimes(1)
  })

  it("should trigger the passed onInputChange when the component's onInputChange is called", async () => {
    const user = userEvent.setup()
    const mockOnInputChange = jest.fn()
    // Stand-in for an Autocomplete: forwards the typed text through onInputChange.
    const AutocompleteLike = (props: any) => (
      <input
        data-testid="autocomplete-input"
        onChange={(event) => props.onInputChange?.(event, event.target.value, 'input')}
      />
    )
    const WrappedAutocomplete = withController(AutocompleteLike)
    const { findByTestId } = render(
      <WrappedAutocomplete name="test" control={{}} onInputChange={mockOnInputChange} />,
    )

    const input = await findByTestId('autocomplete-input')
    await user.type(input, 'ab')

    // Consumer text callback fires per keystroke. (It does not write the field — the
    // field tracks the selected value, surfaced through onChange below.)
    expect(mockOnInputChange).toHaveBeenCalledTimes(2)
  })

  it("should forward the selected value (onChange's 2nd arg) to the Controller's field", async () => {
    const user = userEvent.setup()
    const selectedOption = { id: 'opt-1', label: 'Option 1' }
    // Stand-in for an Autocomplete: passes the selected option as onChange's 2nd arg.
    const SelectLike = (props: any) => (
      <button
        type="button"
        data-testid="select-option"
        onClick={(event) => props.onChange?.(event, selectedOption, 'selectOption')}
      >
        select
      </button>
    )
    const WrappedSelect = withController(SelectLike)
    const { findByTestId } = render(<WrappedSelect name="test" control={{}} />)

    await user.click(await findByTestId('select-option'))

    // The field receives the selected option, not the raw event.
    expect(mockFieldOnChange).toHaveBeenLastCalledWith(selectedOption)
  })
})
