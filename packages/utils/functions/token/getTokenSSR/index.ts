import { ACCESS_KEY_NAME } from '../../../constants/jwt'

export const getTokenSSR = async (key = ACCESS_KEY_NAME) => {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const token = cookieStore.get(key)
  return token?.value
}
