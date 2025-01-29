import { ProfileItemFragment } from '../../../graphql/queries/ProfileItem'

export const mockResolvers = {
  ProfileComponentFragment: {
    id: 'test-profile-id',
    name: 'John Doe',
    urlPath: {
      path: '@johndoe',
    },
    image: {
      url: 'https://example.com/avatar.jpg',
    },
    followersCount: 1200,
    isFollowedByMe: false,
    canChangeRole: true,
    isBlockedByMe: false,
    ...ProfileItemFragment,
  },
}
