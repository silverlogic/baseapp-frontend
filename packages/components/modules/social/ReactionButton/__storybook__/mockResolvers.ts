export const mockResolvers = {
  Node: () => ({
    __typename: 'Comment',
    id: 'comment-1',
    pk: 1,
    body: 'This is a pinned comment.',
    isPinned: true,
    created: '2024-04-11T17:08:58.505961+00:00',
    commentsCount: { total: 2 },
    canChange: true,
    canDelete: true,
    canReport: true,
    canPin: true,
    user: {
      id: 'user-1',
      pk: 1,
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      avatar: {
        url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
      },
    },
    reactionsCount: {
      total: 2,
    },
    myReaction: null,
  }),
}
