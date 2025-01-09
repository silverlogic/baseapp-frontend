const ExpoSecureStore = {
  getItemAsync: jest.fn(async (key: string) => {
    return key === 'ACCESS_KEY_NAME' ? 'mocked_value' : null
  }),
  setItemAsync: jest.fn(async (key: string, value: string) => {
    return true
  }),
  deleteItemAsync: jest.fn(async (key: string) => {
    return true
  }),
}

const Constants = {
  expoConfig: {
    extra: {
      EXPO_PUBLIC_API_BASE_URL: undefined,
      EXPO_PUBLIC_RELAY_ENDPOINT: undefined,
      EXPO_PUBLIC_WS_RELAY_ENDPOINT: undefined,
    },
  },
}

module.exports = {
  ...ExpoSecureStore,
  ...Constants,
}
