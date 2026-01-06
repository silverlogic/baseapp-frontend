import { graphql } from 'react-relay'

export const PageComponentFragment = graphql`
  fragment PageComponentFragment on Page {
    id
    title
    body
    canChange: hasPerm(perm: "change")
    canDelete: hasPerm(perm: "delete")

    ...CommentsFragment
  }
`
