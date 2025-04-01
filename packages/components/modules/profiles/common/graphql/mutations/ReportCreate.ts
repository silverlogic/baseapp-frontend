import { useNotification } from '@baseapp-frontend/utils'

import { UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ReportCreateMutation } from '../../../../../__generated__/ReportCreateMutation.graphql'

export const ReportCreateMutationQuery = graphql`
  mutation ReportCreateMutation($input: ReportCreateInput!) {
    reportCreate(input: $input) {
      target {
        reports {
          edges {
            node {
              pk
              created
            }
          }
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
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })
  }

  return [commit, isMutationInFlight]
}
