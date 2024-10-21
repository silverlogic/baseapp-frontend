const ExpoSecureStore = {
  getItemAsync: jest.fn(async (key) => {
    return key === 'ACCESS_KEY_NAME' ? 'mocked_value' : null
  }),
  setItemAsync: jest.fn(async (key, value) => {
    return true
  }),
  deleteItemAsync: jest.fn(async (key) => {
    return true
  }),
}

module.exports = ExpoSecureStore
