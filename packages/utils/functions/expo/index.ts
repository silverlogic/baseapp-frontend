import Constants from 'expo-constants'

import type { MobileDefaultEnvironmentVariables } from '../../types/env'

export const getExpoConstant = <
  T extends Record<string, string> = MobileDefaultEnvironmentVariables,
>(
  key: keyof T,
) => {
  if (!Constants?.expoConfig?.extra) return undefined

  return (Constants.expoConfig.extra as T)[key]
}
