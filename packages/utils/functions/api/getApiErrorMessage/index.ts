import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'

const parseJsonObject = (raw: string): Record<string, unknown> | undefined => {
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : undefined
  } catch {
    return undefined
  }
}

const messageFromParsed = (parsed: Record<string, unknown>, raw: string) => {
  if (parsed.detail != null) {
    return Array.isArray(parsed.detail) ? parsed.detail.join(' ') : parsed.detail
  }
  const firstKey = Object.keys(parsed)[0]
  const potentialMessage = firstKey ? parsed[firstKey] : undefined
  if (potentialMessage === undefined) {
    return raw
  }
  return Array.isArray(potentialMessage) ? potentialMessage.join(' ') : String(potentialMessage)
}

export const getApiErrorMessage = (error: any, { defaultMessage = DEFAULT_ERROR_MESSAGE } = {}) => {
  let message = defaultMessage

  if (error?.message) {
    const parsed = parseJsonObject(error.message)
    message = parsed ? messageFromParsed(parsed, error.message) : error.message
  }

  if (error?.response?.data) {
    const dataKey = Object.keys(error.response.data)[0]
    const potentialMessage = (dataKey && error.response.data?.[dataKey]) ?? message
    message = Array.isArray(potentialMessage) ? potentialMessage.join(' ') : potentialMessage
  }

  return message
}
