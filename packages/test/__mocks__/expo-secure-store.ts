const ExpoSecureStore = {
  getItemAsync: async (key: string) => {
    return key === 'ACCESS_KEY_NAME' ? 'mocked_value' : null
  },
  setItemAsync: async (key: string, value: string) => {
    return true
  },
  deleteItemAsync: async (key: string) => {
    return true
  },
}

module.exports = ExpoSecureStore
