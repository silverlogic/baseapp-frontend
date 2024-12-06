// TODO: Update

// import { setFormApiErrors } from '..'

// describe('setFormApiErrors', () => {
//   let mockForm: any
//   let mockError: any

//   beforeEach(() => {
//     mockForm = {
//       getValues: jest.fn().mockImplementation(
//         (fieldKey: string) =>
//           ({
//             name: 'John',
//             age: 20,
//           }[fieldKey]),
//       ),
//       setError: jest.fn(),
//     }

//     mockError = {
//       response: {
//         data: {
//           name: ['Name is required'],
//           age: ['Age should be a number'],
//         },
//       },
//     }
//   })

//   it('should set errors correctly on the form', () => {
//     setFormApiErrors(mockForm, mockError)

//     expect(mockForm.setError).toHaveBeenCalledWith('name', {
//       type: 'manual',
//       message: 'Name is required',
//     })
//     expect(mockForm.setError).toHaveBeenCalledWith('age', {
//       type: 'manual',
//       message: 'Age should be a number',
//     })
//   })

//   it('should handle absence of errors', () => {
//     mockError = {}
//     setFormApiErrors(mockForm, mockError)

//     expect(mockForm.setError).not.toHaveBeenCalled()
//   })

//   it('should not set any errors if the data error response is not an object', () => {
//     mockError.response.data = 'This is not an object with a data property'
//     setFormApiErrors(mockForm, mockError)

//     expect(mockForm.setError).not.toHaveBeenCalled()
//   })

//   it('should not set errors for fields that do not exist on the form', () => {
//     mockError.response.data = {
//       name: ['Name is required'],
//       age: ['Age should be a number'],
//       address: ['Address is required'],
//     }

//     setFormApiErrors(mockForm, mockError)

//     expect(mockForm.setError).toHaveBeenCalledWith('name', {
//       type: 'manual',
//       message: 'Name is required',
//     })
//     expect(mockForm.setError).toHaveBeenCalledWith('age', {
//       type: 'manual',
//       message: 'Age should be a number',
//     })
//     expect(mockForm.setError).not.toHaveBeenCalledWith('address', {
//       type: 'manual',
//       message: 'Address is required',
//     })
//   })
// })
