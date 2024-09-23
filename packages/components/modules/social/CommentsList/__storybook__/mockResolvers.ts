export const mockResolvers = {
  Node: () => ({
    comments: {
      edges: [
        {
          node: {
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
              avatar: {
                url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
              },
            },
            reactionsCount: {
              total: 2,
            },
            myReaction: null,
          },
        },
        {
          node: {
            __typename: 'Comment',
            id: 'comment-2',
            pk: 2,
            body: 'This is a regular comment.',
            isPinned: false,
            created: '2024-04-21T19:18:58.505961+00:00',
            commentsCount: { total: 1 },
            canChange: false,
            canDelete: false,
            canReport: true,
            canPin: false,
            user: {
              id: 'user-2',
              pk: 2,
              fullName: 'Jane Smith',
              avatar: {
                url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/c/9/19/resized/50/50/cb95449a94688af33f6e9bb090cf2936.png',
              },
            },
            reactionsCount: {
              total: 3,
            },
            myReaction: {
              id: 'UmVhY3Rpb246MTA0',
              reactionType: 'LIKE',
            },
          },
        },
      ],
      pageInfo: {
        endCursor: 'cursor-2',
        hasNextPage: false,
      },
    },
  }),
}
