import { type Disposable, type UseMutationConfig, graphql, useMutation } from 'react-relay'

import type { ProtectedFileLinkMutation } from '../../../../../__generated__/ProtectedFileLinkMutation.graphql'

/**
 * Mints a short-lived download link for a protected file, bound to the signed-in user (and the
 * profile they act as). Opening the link re-checks access on the server.
 */
export const ProtectedFileLinkMutationQuery = graphql`
  mutation ProtectedFileLinkMutation($input: ProtectedFileLinkInput!) {
    protectedFileLink(input: $input) {
      url
      expiresAt
      file {
        ...ProtectedFile_file
      }
      errors {
        field
        messages
      }
    }
  }
`

/**
 * Commits `protectedFileLink` without toasting: `useProtectedFileDownload` reports errors itself,
 * and a caller using the link differently decides how to surface them.
 */
export const useProtectedFileLinkMutation = (): [
  (config: UseMutationConfig<ProtectedFileLinkMutation>) => Disposable,
  boolean,
] => useMutation<ProtectedFileLinkMutation>(ProtectedFileLinkMutationQuery)
