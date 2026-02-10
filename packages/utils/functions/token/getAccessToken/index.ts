import { getTokens } from '../getTokens'

export const getAccessToken = async (refreshToken?: string | null): Promise<string> => {
  const tokens = await getTokens(refreshToken)
  return tokens.access
}
