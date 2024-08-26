import type { MockPayloadGenerator } from 'relay-test-utils'

type MockResolvers = MockPayloadGenerator.MockResolvers
type MockResolverContext = MockPayloadGenerator.MockResolverContext

let commentIdCounter = 0

export const commentsResolver: MockResolvers = {
  Node: () => ({
    __typename: 'Page',
    __isCommentsInterface: 'Page',
    id: 'test-id',
    isCommentsEnabled: true,
    commentsCount: {
      total: 5,
    },
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
              firstName: 'Jane',
              lastName: 'Smith',
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

export const commentCreateResolver: MockResolvers = {
  CommentCreatePayload: ({ args }: MockResolverContext) => {
    const { input } = args as Record<string, any>
    commentIdCounter += 1
    return {
      comment: {
        node: {
          id: `new-comment-${commentIdCounter}`,
          target: {
            __typename: 'Page',
            id: 'page-id',
            commentsCount: {
              total: 0,
              main: 0,
              replies: 0,
            },
          },
          inReplyTo: null,
          pk: commentIdCounter,
          body: input.body,
          isPinned: false,
          user: {
            id: 'VXNlcjo0',
            pk: 4,
            fullName: 'Alexandre Anicio',
            firstName: 'Alexandre',
            lastName: 'Anicio',
            avatar: {
              url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
            },
          },
          created: new Date().toISOString(),
          commentsCount: {
            total: 0,
          },
          canChange: true,
          canDelete: true,
          canReport: true,
          canPin: true,
          __isReactionsInterface: 'Comment',
          reactionsCount: {
            total: 0,
          },
          myReaction: null,
          __isCommentsInterface: 'Comment',
        },
      },
      errors: null,
    }
  },
}

export const commentReplyResolver: MockResolvers = {
  CommentCreatePayload: ({ args }) => {
    const { input } = args as Record<string, any>
    commentIdCounter += 1
    return {
      comment: {
        node: {
          id: `new-reply-${commentIdCounter}`,
          target: {
            __typename: 'Page',
            id: 'page-id',
            commentsCount: {
              total: 0,
            },
          },
          inReplyTo: {
            id: 'comment-2',
            commentsCount: {
              total: 2,
              main: 2,
              replies: 2,
            },
          },
          pk: commentIdCounter,
          body: input.body,
          isPinned: false,
          user: {
            id: 'VXNlcjo0',
            pk: 4,
            fullName: 'Alexandre Anicio',
            firstName: 'Alexandre',
            lastName: 'Anicio',
            avatar: {
              url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
            },
          },
          created: new Date().toISOString(),
          commentsCount: {
            total: 0,
          },
          canChange: true,
          canDelete: true,
          canReport: true,
          canPin: true,
          __isReactionsInterface: 'Comment',
          reactionsCount: {
            total: 0,
          },
          myReaction: null,
          __isCommentsInterface: 'Comment',
        },
      },
      errors: null,
    }
  },
}

export const commentsWithNextPageResolver: MockResolvers = {
  Node: () => ({
    __typename: 'Page',
    __isCommentsInterface: 'Page',
    id: 'test-id',
    isCommentsEnabled: true,
    commentsCount: {
      total: 10,
    },
    comments: {
      edges: [
        {
          node: {
            __typename: 'Comment',
            id: 'comment-1',
            pk: 1,
            body: 'First comment',
            isPinned: true,
            created: '2024-04-11T17:08:58.505961+00:00',
            commentsCount: { total: 0 },
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
              total: 0,
            },
            myReaction: null,
          },
          cursor: 'cursor-1',
        },
        {
          node: {
            __typename: 'Comment',
            id: 'comment-2',
            pk: 2,
            body: 'Second comment',
            isPinned: false,
            created: '2024-04-21T19:18:58.505961+00:00',
            commentsCount: { total: 0 },
            canChange: false,
            canDelete: false,
            canReport: true,
            canPin: false,
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
              total: 0,
            },
            myReaction: null,
          },
          cursor: 'cursor-2',
        },
        {
          node: {
            __typename: 'Comment',
            id: 'comment-3',
            pk: 3,
            body: 'Third comment',
            isPinned: false,
            created: '2024-04-21T19:18:58.505961+00:00',
            commentsCount: { total: 0 },
            canChange: false,
            canDelete: false,
            canReport: true,
            canPin: false,
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
              total: 0,
            },
            myReaction: null,
          },
          cursor: 'cursor-3',
        },
        {
          node: {
            __typename: 'Comment',
            id: 'comment-4',
            pk: 4,
            body: 'Fourth comment',
            isPinned: false,
            created: '2024-04-21T19:18:58.505961+00:00',
            commentsCount: { total: 0 },
            canChange: false,
            canDelete: false,
            canReport: true,
            canPin: false,
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
              total: 0,
            },
            myReaction: null,
          },
          cursor: 'cursor-4',
        },
        {
          node: {
            __typename: 'Comment',
            id: 'comment-5',
            pk: 5,
            body: 'Fifth comment',
            isPinned: false,
            created: '2024-04-21T19:18:58.505961+00:00',
            commentsCount: { total: 0 },
            canChange: false,
            canDelete: false,
            canReport: true,
            canPin: false,
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
              total: 0,
            },
            myReaction: null,
          },
          cursor: 'cursor-5',
        },
      ],
      pageInfo: {
        endCursor: 'cursor-5',
        hasNextPage: true,
      },
    },
  }),
}

export const commentsWithElevenRepliesResolver: MockResolvers = {
  Node: () => ({
    __typename: 'Page',
    __isCommentsInterface: 'Page',
    id: 'test-id',
    isCommentsEnabled: true,
    commentsCount: {
      total: 5,
    },
    comments: {
      edges: [
        {
          node: {
            __typename: 'Comment',
            id: 'comment-with-eleven-replies',
            pk: 11,
            body: 'This is comment with eleven replies.',
            isPinned: false,
            created: '2024-04-11T17:08:58.505961+00:00',
            commentsCount: { total: 11 },
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
            cursor: 'cursor-1',
            reactionsCount: {
              total: 2,
            },
            myReaction: null,
          },
        },
      ],
      pageInfo: {
        endCursor: 'cursor-1',
        hasNextPage: false,
      },
    },
  }),
}
