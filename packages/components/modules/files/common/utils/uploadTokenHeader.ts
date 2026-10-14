import { registerGraphQLRequestHeaders } from '@baseapp-frontend/graphql/config/requestHeaders'

// Anonymous uploads have no owner; the token from initiation is the uploader's proof, also
// for reading the file back through GraphQL (url, thumbnail) in later requests.
const STORAGE_KEY = 'baseapp-files-upload-tokens'
const MAX_TOKENS = 20
export const UPLOAD_TOKEN_HEADER = 'X-File-Upload-Token'

const getSessionStorage = (): Storage | undefined => {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : undefined
  } catch {
    return undefined
  }
}

const load = (): string[] => {
  try {
    const stored = JSON.parse(getSessionStorage()?.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(stored) ? stored.filter((token) => typeof token === 'string') : []
  } catch {
    return []
  }
}

let tokens: string[] = load()

/** Keep an anonymous upload's token (the most recent ones, for this browser session). */
export const rememberUploadToken = (token: string) => {
  tokens = [...tokens.filter((existing) => existing !== token), token].slice(-MAX_TOKENS)
  try {
    getSessionStorage()?.setItem(STORAGE_KEY, JSON.stringify(tokens))
  } catch {
    // Storage full or blocked: the in-memory list still covers this page.
  }
}

export const rememberedUploadTokens = (): string[] => tokens

registerGraphQLRequestHeaders(() => ({
  [UPLOAD_TOKEN_HEADER]: tokens.length ? tokens.join(',') : undefined,
}))
