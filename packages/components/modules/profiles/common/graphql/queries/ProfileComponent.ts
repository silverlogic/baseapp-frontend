import { graphql } from 'react-relay'

export const ProfileComponentFragment = graphql`
  fragment ProfileComponentFragment on Profile {
    id
    status
    name
    biography
    image(height: 96, width: 96) {
      url
    }
    bannerImage(height: 290, width: 868) {
      url
    }
    isFollowedByMe
    followersCount
    followingCount
    canChange: hasPerm(perm: "change")
    urlPath {
      path
    }
    owner {
      phoneNumber
    }
    isBlockedByMe
    ...BlockToggleFragment
  }
`
