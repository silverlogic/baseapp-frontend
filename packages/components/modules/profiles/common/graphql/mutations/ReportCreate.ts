import { useNotification } from '@baseapp-frontend/utils'

import { UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ReportCreateMutation } from '../../../../../__generated__/ReportCreateMutation.graphql'

export const ReportCreateMutationQuery = graphql`
  mutation ReportCreateMutation($input: ReportCreateInput!) {
    reportCreate(input: $input) {
      report {
        node {
          id
          created
        }
      }
    }
  }
`

export const useReportCreateMutation = (): [
  (config: UseMutationConfig<ReportCreateMutation>) => void,
  boolean,
] => {
  const [commitMutation, isMutationInFlight] =
    useMutation<ReportCreateMutation>(ReportCreateMutationQuery)

  const { sendToast } = useNotification()
  const commit = (config: UseMutationConfig<ReportCreateMutation>) => {
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        if (error.message.includes('duplicate key value violates unique constraint')) {
          sendToast('You have already reported this profile.', { type: 'error' })
        } else {
          sendToast(error.message, { type: 'error' })
        }
        config?.onError?.(error)
      },
    })
  }

  return [commit, isMutationInFlight]
}
