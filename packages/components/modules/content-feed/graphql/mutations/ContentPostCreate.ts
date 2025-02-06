import { ContentPostCreateMutation } from '__generated__/ContentPostCreateMutation.graphql'
import { graphql, useMutation } from 'react-relay'

export const ContentPostCreateMutationQuery = graphql`
  mutation ContentPostCreateMutation($input: ContentPostCreateInput!) {
    contentPostCreate(input: $input) {
      contentPost {
        node {
          id
          content
          author {
            email
          }
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
