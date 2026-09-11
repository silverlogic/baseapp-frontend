import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'

const toText = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(' ')
  }
  return typeof value === 'string' ? value : JSON.stringify(value)
}

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
    return toText(parsed.detail)
  }
  const firstKey = Object.keys(parsed)[0]
  const potentialMessage = firstKey ? parsed[firstKey] : undefined
  return potentialMessage === undefined ? raw : toText(potentialMessage)
}

export const getApiErrorMessage = (error: any, { defaultMessage = DEFAULT_ERROR_MESSAGE } = {}) => {
  let message = defaultMessage

  if (error?.message) {
    const parsed = parseJsonObject(error.message)
    message = parsed ? messageFromParsed(parsed, error.message) : error.message
  }

  if (error?.response?.data) {
    const dataKey = Object.keys(error.response.data)[0]
    message = toText((dataKey && error.response.data?.[dataKey]) ?? message)
  }

  return message
}
