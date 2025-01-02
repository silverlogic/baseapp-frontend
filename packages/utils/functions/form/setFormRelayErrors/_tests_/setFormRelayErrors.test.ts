import { setFormRelayErrors } from '..'

describe('setFormRelayErrors', () => {
  let mockForm: any
  let mockErrors: any

  beforeEach(() => {
    mockForm = {
      getValues: jest.fn().mockImplementation(
        (fieldKey: string) =>
          ({
            name: 'John',
            age: 20,
            image: null,
            bio: '',
          })[fieldKey],
      ),
      setError: jest.fn(),
    }

    mockErrors = [
      { field: 'name', messages: ['Name is required'] },
      { field: 'age', messages: ['Age should be a number'] },
    ]
  })

  it('should set errors correctly on the form', () => {
    setFormRelayErrors(mockForm, mockErrors)

    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'custom',
      message: 'Name is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'custom',
      message: 'Age should be a number',
    })
  })

  it('should set errors also for null or blank fields', () => {
    mockErrors = [
      { field: 'image', messages: ['Image is required'] },
      { field: 'bio', messages: ['Bio may not be blank'] },
    ]
    setFormRelayErrors(mockForm, mockErrors)

    expect(mockForm.setError).toHaveBeenCalledWith('image', {
      type: 'custom',
      message: 'Image is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('bio', {
      type: 'custom',
      message: 'Bio may not be blank',
    })
  })

  it('should handle absence of errors', () => {
    mockErrors = []
    setFormRelayErrors(mockForm, mockErrors)

    expect(mockForm.setError).not.toHaveBeenCalled()
  })

  it('should not set any errors if the objects of the error array do not have a "field" key', () => {
    mockErrors = [
      { messages: ['Name is required'] },
      { field: 'age', messages: ['Age should be a number'] },
    ]
    setFormRelayErrors(mockForm, mockErrors)

    expect(mockForm.setError).not.toHaveBeenCalledWith('name', {
      type: 'custom',
      message: 'Name is required',
    })

    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'custom',
      message: 'Age should be a number',
    })
  })

  it('should not set errors for fields that do not exist on the form', () => {
    mockErrors = [
      { field: 'name', messages: ['Name is required'] },
      { field: 'age', messages: ['Age should be a number'] },
      { field: 'address', messages: ['Address is required'] },
    ]

    setFormRelayErrors(mockForm, mockErrors)

    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'custom',
      message: 'Name is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'custom',
      message: 'Age should be a number',
    })
    expect(mockForm.setError).not.toHaveBeenCalledWith('address', {
      type: 'custom',
      message: 'Address is required',
    })
  })
})
