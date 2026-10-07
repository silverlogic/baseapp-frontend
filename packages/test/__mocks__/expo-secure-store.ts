const getItem = (key: string) => (key === 'ACCESS_KEY_NAME' ? 'mocked_value' : null)

const ExpoSecureStore = {
  getItem,
  getItemAsync: async (key: string) => getItem(key),
  setItemAsync: async (_key: string, _value: string) => true,
  deleteItemAsync: async (_key: string) => true,
}

module.exports = ExpoSecureStore
