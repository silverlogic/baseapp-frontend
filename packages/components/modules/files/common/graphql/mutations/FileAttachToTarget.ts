import { useNotification } from '@baseapp-frontend/utils'

import { type Disposable, type UseMutationConfig, graphql, useMutation } from 'react-relay'

import type { FileAttachToTargetMutation } from '../../../../../__generated__/FileAttachToTargetMutation.graphql'

export const FileAttachToTargetMutationQuery = graphql`
  mutation FileAttachToTargetMutation($input: FileAttachToTargetInput!, $connections: [ID!]!) {
    fileAttachToTarget(input: $input) {
      attachedFiles @prependEdge(connections: $connections) {
        node {
          ...FileItem_file
        }
      }
      target {
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

export const useFileAttachToTargetMutation = (): [
  (config: UseMutationConfig<FileAttachToTargetMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<FileAttachToTargetMutation>(
    FileAttachToTargetMutationQuery,
  )

  const commit = (config: UseMutationConfig<FileAttachToTargetMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        if (errors?.length) {
          errors.forEach((error) => {
            sendToast(error.message, { type: 'error' })
          })
        }

        const mutationErrors = response?.fileAttachToTarget?.errors
        if (mutationErrors?.length) {
          mutationErrors.forEach((error) => {
            if (error?.messages) {
              sendToast(error.messages.join(', '), { type: 'error' })
            }
          })
        } else {
          sendToast('Files attached successfully', { type: 'success' })
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
