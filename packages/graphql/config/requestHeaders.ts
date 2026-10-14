type RequestHeaders = Record<string, string | undefined>
type RequestHeadersProvider = () => RequestHeaders

const providers = new Set<RequestHeadersProvider>()

/**
 * Add headers to every GraphQL HTTP request, e.g. a feature module's credentials that the
 * auth layer doesn't know about. Returns a function that removes the provider.
 */
export const registerGraphQLRequestHeaders = (provider: RequestHeadersProvider) => {
  providers.add(provider)
  return () => {
    providers.delete(provider)
  }
}

/** The headers every registered provider contributes; empty values are left out. */
export const getGraphQLRequestHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {}
  providers.forEach((provider) => {
    Object.entries(provider()).forEach(([name, value]) => {
      if (value) headers[name] = value
    })
  })
  return headers
}
