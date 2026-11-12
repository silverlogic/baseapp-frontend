import { graphql } from 'react-relay'

export const ImpersonationBannerFragment = graphql`
  fragment ImpersonationBanner_user on User {
    id
    fullName
    impersonation {
      id
      readOnly
      startedAt
      expiresAt
      impersonator {
        id
        fullName
      }
    }
  }
`
