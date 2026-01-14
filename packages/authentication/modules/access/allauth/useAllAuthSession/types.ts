export interface UseAllAuthSessionOptions {
  accessKeyName?: string
  refreshKeyName?: string
}

export interface AllAuthSessionData {
  accessToken: string
  refreshToken: string
  rawData?: {
    user?: {
      id?: number | string
      display?: string
      email?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }
}
