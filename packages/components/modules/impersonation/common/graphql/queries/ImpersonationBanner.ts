import { graphql } from 'react-relay'

export const ImpersonationBannerQuery = graphql`
  query ImpersonationBannerQuery {
    me {
      ...ImpersonationBanner_user
    }
  }
`
