import { setFormApiErrors } from '..'

describe('setFormApiErrors', () => {
  let mockForm: any
  let mockError: any

  beforeEach(() => {
    mockForm = {
      setError: jest.fn(),
    }

    mockError = {
      response: {
        name: ['Name is required'],
        age: ['Age should be a number'],
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
})
