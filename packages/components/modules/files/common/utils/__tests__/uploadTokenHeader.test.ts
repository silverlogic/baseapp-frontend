import { vi } from 'vitest'

// Fresh modules each time, so the registry and the remembered tokens start from storage.
const loadModule = async () => {
  vi.resetModules()
  const { getGraphQLRequestHeaders } =
    await import('@baseapp-frontend/graphql/config/requestHeaders')
  return { ...(await import('../uploadTokenHeader')), getGraphQLRequestHeaders }
}

describe('uploadTokenHeader', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('sends no header before any anonymous upload', async () => {
    const { getGraphQLRequestHeaders } = await loadModule()

    expect(getGraphQLRequestHeaders()['X-File-Upload-Token']).toBeUndefined()
  })

  it('sends remembered tokens on GraphQL requests', async () => {
    const { rememberUploadToken, getGraphQLRequestHeaders } = await loadModule()
    rememberUploadToken('token-1')
    rememberUploadToken('token-2')
    rememberUploadToken('token-1')

    expect(getGraphQLRequestHeaders()['X-File-Upload-Token']).toBe('token-2,token-1')
  })

  it('keeps the tokens for the browser session, capped to the most recent', async () => {
    const { rememberUploadToken } = await loadModule()
    Array.from({ length: 25 }, (_, i) => rememberUploadToken(`token-${i}`))

    const { rememberedUploadTokens } = await loadModule()

    expect(rememberedUploadTokens()).toHaveLength(20)
    expect(rememberedUploadTokens().at(-1)).toBe('token-24')
  })
})
