export const mockResolvers = {
  Node: () => ({
    __typename: 'Profile',
    id: '1',
    name: 'Profile 1',
    biography: 'Profile 1 biography',
    image: null,
    bannerImage: null,
    canChange: true,
    canDelete: true,
    urlPath: {
      path: '/profile/1',
    },
    owner: {
      phoneNumber: '1234567890',
    },
  }),
  Mutation: () => ({
    profileUpdate: {
      errors: null,
    },
  }),
}

export const mockResolversWithMutationError = {
  ...mockResolvers,
  Mutation: () => ({
    profileUpdate: {},
  }),
}
