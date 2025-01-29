export const mockResolvers = {
  Member: () => ({
    id: 'test-member-id',
    user: {
      id: 'test-user-id',
      profile: {
        id: 'test-profile-id',
        name: 'John Doe',
        image: {
          url: 'https://example.com/avatar.jpg',
        },
        urlPath: {
          path: '/john-doe',
        },
        ' $fragmentSpreads': {
          ProfileItemFragment: true,
        },
      },
    },
    ' $fragmentSpreads': {
      MemberItemFragment: true,
    },
  }),
  ProfileItemFragment: {
    id: 'test-profile-id',
    name: 'John Doe',
    image: {
      url: 'https://example.com/avatar.jpg',
    },
    urlPath: {
      path: '/john-doe',
    },
    ' $fragmentSpreads': {
      ProfileItemFragment: true,
    },
  },
  MemberItemFragment: {
    id: 'test-member-id',
    role: 'ADMIN',
    status: 'ACTIVE',
    user: {
      id: 'test-user-id',
      profile: {
        id: 'test-profile-id',
        name: 'John Doe',
        image: { url: 'https://example.com/avatar.jpg' },
        urlPath: { path: '/john-doe' },
        ' $fragmentSpreads': {
          ProfileItemFragment: true,
        },
      },
    },
  },
}
