import { render } from '@baseapp-frontend/test'

import withController from '..'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render: r }) => r({ field: {}, fieldState: {} }),
}))

describe('withController', () => {
  const TestComponent = (props: any) => <div {...props}>Test</div>
  const WrappedComponent = withController(TestComponent)

  it('should render the Controller component if control prop is provided', () => {
    const { queryByText } = render(<WrappedComponent name="test" control={{}} />)
    expect(queryByText('Test')).toBeInTheDocument()
  })

  it('should directly render the passed component if control prop is not provided', () => {
    const { queryByText } = render(<WrappedComponent name="test" />)
    expect(queryByText('Test')).toBeInTheDocument()
  })

  it('should pass down the correct props', () => {
    const { queryByText } = render(
      <WrappedComponent name="test" someProp="prop" control={{}} enableError />,
    )
    const testComponent = queryByText('Test')

    expect(testComponent).toHaveAttribute('name', 'test')
    expect(testComponent).toHaveAttribute('someProp', 'prop')
  })
})
