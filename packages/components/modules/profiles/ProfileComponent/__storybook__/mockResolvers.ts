export const mockResolvers = {
  Profile: () => ({
    id: 'profile-1',
    name: 'John Doe',
    biography: 'Software Engineer at Example Inc.',
    image: {
      url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/c/9/19/resized/50/50/cb95449a94688af33f6e9bb090cf2936.png',
    },
    bannerImage: {
      url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    followersCount: 120,
    followingCount: 80,
    isFollowedByMe: false,
    isBlockedByMe: false,
    canChange: true,
    urlPath: { path: '/john-doe' },
  }),
}
