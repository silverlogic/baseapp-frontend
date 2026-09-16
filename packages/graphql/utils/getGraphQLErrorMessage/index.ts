interface GraphQLErrorLike {
  graphQLErrors?: ReadonlyArray<{ message?: string | null } | null> | null
}

/**
 * Extract a human-friendly message from a Relay network error.
 *
 * The Relay network layer (see `config/environment`) attaches the raw GraphQL
 * `errors` array to the thrown error as `graphQLErrors`. This returns the first
 * error's `message` — e.g. a backend-raised `GraphQLError` such as
 * "An invitation has already been sent to x@y.com" — and never the verbose
 * "Error fetching GraphQL query '…' with variables '…': […]" wrapper that Relay
 * puts on `error.message`. Falls back to `fallback` when no structured message
 * is available.
 */
const getGraphQLErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  const graphQLErrors = (error as GraphQLErrorLike | null)?.graphQLErrors
  const message = graphQLErrors?.find((graphQLError) => graphQLError?.message)?.message
  return message || fallback
}

export default getGraphQLErrorMessage
