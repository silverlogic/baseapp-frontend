import { graphql } from 'react-relay'

export const UserItemFragment = graphql`
  fragment UserItemFragment on User {
    id
    email
    isActive
    fullName
  }
`
