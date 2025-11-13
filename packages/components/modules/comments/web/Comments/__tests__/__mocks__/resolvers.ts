import type { MockPayloadGenerator } from 'relay-test-utils'

type MockResolvers = MockPayloadGenerator.MockResolvers
type MockResolverContext = MockPayloadGenerator.MockResolverContext

let commentIdCounter = 0

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
          body: input.body,
          isPinned: false,
          user: {
            id: 'VXNlcjo0',
            fullName: 'Alexandre Anicio',
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
          body: input.body,
          isPinned: false,
          user: {
            id: 'VXNlcjo0',
            fullName: 'Alexandre Anicio',
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
