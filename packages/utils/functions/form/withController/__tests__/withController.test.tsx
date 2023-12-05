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
})
