export const mockResolvers = {
  Node: () => ({
    __typename: 'Profile',
    id: 'profile-1',
    name: 'John Doe',
    isBlockedByMe: false,
  }),
}
