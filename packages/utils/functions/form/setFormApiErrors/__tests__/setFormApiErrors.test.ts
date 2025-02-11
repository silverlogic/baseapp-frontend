import { setFormApiErrors } from '..'

describe('setFormApiErrors', () => {
  let mockForm: any
  let mockError: any

  beforeEach(() => {
    mockForm = {
      getValues: jest.fn().mockImplementation(
        (fieldKey: string) =>
          ({
            name: 'John',
            age: 20,
            bio: '',
            image: null,
          })[fieldKey],
      ),
      setError: jest.fn(),
    }

    mockError = {
      response: {
        data: {
          name: ['Name is required'],
          age: ['Age should be a number'],
        },
      },
    }
  })

  it('should set errors correctly on the form', () => {
    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'manual',
      message: 'Name is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'manual',
      message: 'Age should be a number',
    })
  })

  it('should handle absence of errors', () => {
    mockError = {}
    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).not.toHaveBeenCalled()
  })

  it('should not set any errors if the data error response is not an object', () => {
    mockError.response.data = 'This is not an object with a data property'
    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).not.toHaveBeenCalled()
  })

  it('should not set errors for fields that do not exist on the form', () => {
    mockError.response.data = {
      name: ['Name is required'],
      age: ['Age should be a number'],
      address: ['Address is required'],
    }

    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'manual',
      message: 'Name is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'manual',
      message: 'Age should be a number',
    })
    expect(mockForm.setError).not.toHaveBeenCalledWith('address', {
      type: 'manual',
      message: 'Address is required',
    })
  })

  it('should set errors for null or blank fields', () => {
    mockError.response.data = {
      image: ['Image is required'],
      bio: ['Bio may not be blank'],
    }
    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).toHaveBeenCalledWith('image', {
      type: 'manual',
      message: 'Image is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('bio', {
      type: 'manual',
      message: 'Bio may not be blank',
    })
  })

  it('should also handle Error objects', () => {
    mockError = new Error(
      JSON.stringify({
        name: ['Name is required'],
        age: ['Age should be a number'],
      }),
    )
    setFormApiErrors(mockForm, mockError)

    expect(mockForm.setError).toHaveBeenCalledWith('name', {
      type: 'manual',
      message: 'Name is required',
    })
    expect(mockForm.setError).toHaveBeenCalledWith('age', {
      type: 'manual',
      message: 'Age should be a number',
    })
  })
})
