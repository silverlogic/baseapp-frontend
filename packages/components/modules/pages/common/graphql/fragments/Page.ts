import { graphql } from 'react-relay'

export const PageComponentFragment = graphql`
  fragment PageComponentFragment on Page {
    pk
    id
    title
    body
    canChange: hasPerm(perm: "change")
    canDelete: hasPerm(perm: "delete")

    ...CommentsFragment
  }
`
