import { getMutationErrorMessage } from '..'

describe('getMutationErrorMessage', () => {
  it('should return undefined when there are no errors', () => {
    expect(getMutationErrorMessage(undefined, undefined)).toBeUndefined()
    expect(getMutationErrorMessage(null, null)).toBeUndefined()
    expect(getMutationErrorMessage([], [])).toBeUndefined()
  })

  it('should return the first payload error message', () => {
    const payloadErrors = [
      { field: 'email', messages: ['Email is already taken.', 'Email is invalid.'] },
      { field: 'name', messages: ['Name is required.'] },
    ]
    expect(getMutationErrorMessage(payloadErrors, undefined)).toBe('Email is already taken.')
  })

  it('should skip null payload entries and empty message lists', () => {
    const payloadErrors = [null, { field: 'email', messages: [] }, { messages: ['Not allowed.'] }]
    expect(getMutationErrorMessage(payloadErrors, undefined)).toBe('Not allowed.')
  })

  it('should prefer payload errors over transport errors', () => {
    const payloadErrors = [{ messages: ['Payload error.'] }]
    const transportErrors = [{ message: 'Transport error.' }]
    expect(getMutationErrorMessage(payloadErrors, transportErrors)).toBe('Payload error.')
  })

  it('should return the first transport error message when there are no payload errors', () => {
    const transportErrors = [{ message: 'Transport error.' }, { message: 'Another error.' }]
    expect(getMutationErrorMessage(undefined, transportErrors)).toBe('Transport error.')
  })

  it('should fall back to the default message when payload errors carry no messages', () => {
    const payloadErrors = [{ field: 'email', messages: [] }]
    expect(getMutationErrorMessage(payloadErrors, undefined)).toBe('Something went wrong.')
  })

  it('should fall back to the transport error message when payload errors carry no messages', () => {
    const payloadErrors = [{ field: 'email', messages: [] }]
    const transportErrors = [{ message: 'You do not have permission.' }]
    expect(getMutationErrorMessage(payloadErrors, transportErrors)).toBe(
      'You do not have permission.',
    )
  })

  it('should fall back to the default message when messages are empty strings', () => {
    const payloadErrors = [{ field: 'email', messages: [''] }]
    expect(getMutationErrorMessage(payloadErrors, undefined)).toBe('Something went wrong.')
  })

  it('should fall back to the default message when transport errors carry no message', () => {
    expect(getMutationErrorMessage(undefined, [{ message: '' }])).toBe('Something went wrong.')
    expect(getMutationErrorMessage(undefined, [null])).toBe('Something went wrong.')
  })

  it('should use a custom default message', () => {
    const payloadErrors = [{ field: 'email', messages: [] }]
    expect(
      getMutationErrorMessage(payloadErrors, undefined, { defaultMessage: 'Failed to invite.' }),
    ).toBe('Failed to invite.')
  })
})
