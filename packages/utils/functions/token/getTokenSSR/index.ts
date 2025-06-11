import { cookies } from 'next/headers'

import { ACCESS_KEY_NAME } from '../../../constants/jwt'

export const getTokenSSR = async (key = ACCESS_KEY_NAME) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(key)
  return token?.value
}
