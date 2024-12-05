import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { OrganizationCreateMutation } from '../../../../__generated__/OrganizationCreateMutation.graphql'

export const OrganizationCreateMutationQuery = graphql`
  mutation OrganizationCreateMutation($input: OrganizationCreateInput!, $connections: [ID!]!) {
    organizationCreate(input: $input) {
      organization {
        node {
          id
        }
      }
      profile @prependEdge(connections: $connections) {
        node {
          ...ProfileItemFragment
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useOrganizationCreateMutation = (): [
  (config: UseMutationConfig<OrganizationCreateMutation>) => Disposable,
  boolean,
] => {
  const { sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<OrganizationCreateMutation>(
    OrganizationCreateMutationQuery,
  )

  const commit = (config: UseMutationConfig<OrganizationCreateMutation>) =>
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

  return [commit, isMutationInFlight]
}
