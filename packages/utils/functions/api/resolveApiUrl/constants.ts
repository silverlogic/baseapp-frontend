export const FORWARDED_HOST_HEADER = 'X-Forwarded-Host'

// Copied from the incoming request when present, so the API sees the scheme the browser used.
export const FORWARDED_SCHEME_HEADERS = ['X-Forwarded-Proto', 'X-Forwarded-Protocol'] as const
