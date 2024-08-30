import { toBase64 } from '../toBase64'

export const getImageString = async (avatar: string | File | Blob) => {
  if (typeof avatar === 'string') return avatar.length === 0 ? avatar : undefined
  return toBase64(avatar)
}
