import qs from 'qs'

export function buildQueryString(params: any) {
  return qs.stringify(params, { arrayFormat: 'repeat' })
}
