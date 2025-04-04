import type { MobileDefaultEnvironmentVariables } from '../../types/env'

export const getExpoConstant = <
  T extends Record<string, string> = MobileDefaultEnvironmentVariables,
>(
  key: keyof T,
) => {
  try {
    // Dynamically require to avoid crashing Storybook
    const Constants = require('expo-constants').default

    if (!Constants?.expoConfig?.extra) return undefined

    return (Constants.expoConfig.extra as T)[key]
  } catch (e) {
    return undefined
  }
}
