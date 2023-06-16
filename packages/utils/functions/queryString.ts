import qs from 'qs'

export function buildQueryString(params: Record<string, any>) {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}
