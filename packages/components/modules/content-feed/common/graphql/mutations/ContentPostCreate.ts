import { graphql, useMutation } from 'react-relay'

import { ContentPostCreateMutation } from '../../../../../__generated__/ContentPostCreateMutation.graphql'

export const ContentPostCreateMutationQuery = graphql`
  mutation ContentPostCreateMutation($input: ContentPostCreateInput!) {
    contentPostCreate(input: $input) {
      contentPost {
        node {
          id
          content
          user {
            email
          }
          isReactionsEnabled
        }
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useContentPostCreateMutation = () =>
  useMutation<ContentPostCreateMutation>(ContentPostCreateMutationQuery)
