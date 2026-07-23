import { useNotification } from '@baseapp-frontend/utils'

import { type Disposable, type UseMutationConfig, graphql, useMutation } from 'react-relay'

import type { FileDeleteMutation } from '../../../../../__generated__/FileDeleteMutation.graphql'

export const FileDeleteMutationQuery = graphql`
  mutation FileDeleteMutation($input: FileDeleteInput!, $connections: [ID!]!) {
    fileDelete(input: $input) {
      deletedId @deleteEdge(connections: $connections)
      parent {
        filesCount
        isFilesEnabled
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useFileDeleteMutation = (): [
  (config: UseMutationConfig<FileDeleteMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] =
    useMutation<FileDeleteMutation>(FileDeleteMutationQuery)

  const commit = (config: UseMutationConfig<FileDeleteMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        if (errors?.length) {
          errors.forEach((error) => {
            sendToast(error.message, { type: 'error' })
          })
        }

        const mutationErrors = response?.fileDelete?.errors
        if (mutationErrors?.length) {
          mutationErrors.forEach((error) => {
            if (error?.messages) {
              sendToast(error.messages.join(', '), { type: 'error' })
            }
          })
        } else {
          sendToast('File deleted successfully', { type: 'success' })
        }

        config?.onCompleted?.(response, errors)
      },
      onError: (error: Error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
