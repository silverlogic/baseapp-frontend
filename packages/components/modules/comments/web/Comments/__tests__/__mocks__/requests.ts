import { MOCK_PROFILE } from './constants'

export const replytoCommentMockData = {
  data: {
    node: {
      __typename: 'Comment',
      id: 'comment-2',
      body: 'This is a regular comment.',
      isPinned: false,
      created: '2024-04-21T19:18:58.505961+00:00',
      commentsCount: { total: 1 },
      canChange: false,
      canDelete: false,
      canReport: true,
      canPin: false,
      profile: MOCK_PROFILE,
      user: {
        id: 'user-2',
        fullName: 'Jane Smith',
        avatar: {
          url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/c/9/19/resized/50/50/cb95449a94688af33f6e9bb090cf2936.png',
        },
      },
      __isCommentsInterface: 'Comment',
      comments: {
        pageInfo: {
          endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          hasNextPage: false,
        },
        edges: [
          {
            node: {
              id: 'Q29tbWVudDoyMTg=',
              isPinned: false,
              body: 'Some reply',
              profile: MOCK_PROFILE,
              user: {
                id: 'VXNlcjo0',
                fullName: 'Alexandre Anicio',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-21T23:02:53.693681+00:00',
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
              __typename: 'Comment',
            },
            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          },
        ],
      },
      __isReactionsInterface: 'Comment',
      reactionsCount: {
        total: 3,
      },
      myReaction: {
        id: 'UmVhY3Rpb246MTA0',
        reactionType: 'LIKE',
      },
    },
  },
}

export const likeACommentMockData = {
  data: {
    reactionToggle: {
      reaction: {
        node: {
          id: 'UmVhY3Rpb246MTky',
          reactionType: 'LIKE',
        },
      },
      reactionDeletedId: null,
      target: {
        __typename: 'Comment',
        id: 'comment-1',
        __isReactionsInterface: 'Comment',
        reactionsCount: {
          total: 3,
        },
        myReaction: {
          id: 'UmVhY3Rpb246MTky',
          reactionType: 'LIKE',
        },
      },
    },
  },
}

export const unlikeACommentMockData = {
  data: {
    reactionToggle: {
      reaction: null,
      reactionDeletedId: 'UmVhY3Rpb246MTky',
      target: {
        __typename: 'Comment',
        id: 'comment-1',
        __isReactionsInterface: 'Comment',
        reactionsCount: {
          total: 2,
        },
        myReaction: null,
      },
    },
  },
}

export const unpinACommentMockData = {
  data: {
    commentPin: {
      comment: {
        id: 'comment-1',
        isPinned: false,
      },
    },
  },
}

export const pinACommentMockData = {
  data: {
    commentPin: {
      comment: {
        id: 'new-reply-3',
        isPinned: true,
      },
    },
  },
}

export const commentEditMockData = {
  data: {
    commentUpdate: {
      comment: {
        id: 'comment-1',
        body: 'This is not a pinned comment anymore.',
        __isCommentsInterface: 'Comment',
        commentsCount: {
          total: 2,
        },
        comments: {
          pageInfo: {
            endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
            hasNextPage: false,
          },
          edges: [
            {
              node: {
                id: 'Q29tbWVudDoyMjA=',
                isPinned: false,
                body: 'reply',
                user: {
                  id: 'VXNlcjo0',
                  fullName: 'Alexandre Anicio',
                  avatar: {
                    url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                  },
                },
                created: '2024-08-24T01:03:09.090046+00:00',
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
                __typename: 'Comment',
              },
              cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            },
            {
              node: {
                id: 'Q29tbWVudDoyMTg=',
                isPinned: false,
                body: 'Some reply',
                user: {
                  id: 'VXNlcjo0',
                  fullName: 'Alexandre Anicio',
                  avatar: {
                    url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                  },
                },
                created: '2024-08-21T23:02:53.693681+00:00',
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
                __typename: 'Comment',
              },
              cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
            },
          ],
        },
      },
      errors: null,
    },
  },
}

export const commentDeleteMockData = {
  data: {
    commentDelete: {
      deletedId: 'comment-1',
      target: {
        __typename: 'Page',
        id: 'page-id',
        commentsCount: {
          total: 50,
          main: 16,
          replies: 34,
        },
      },
      inReplyTo: null,
    },
  },
}

export const commentsNextPageMockData = {
  data: {
    node: {
      __typename: 'Page',
      __isCommentsInterface: 'Page',
      id: 'test-id',
      commentsCount: {
        total: 10,
      },
      comments: {
        pageInfo: {
          endCursor: 'cursor-10',
          hasNextPage: false,
        },
        edges: [
          {
            node: {
              __typename: 'Comment',
              id: 'comment-6',
              body: 'Sixth comment',
              isPinned: false,
              created: '2024-04-22T19:18:58.505961+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              reactionsCount: {
                total: 0,
              },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
            cursor: 'cursor-6',
          },
          {
            node: {
              __typename: 'Comment',
              id: 'comment-7',
              body: 'Seventh comment',
              isPinned: false,
              created: '2024-04-22T19:18:58.505961+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              reactionsCount: {
                total: 0,
              },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
            cursor: 'cursor-7',
          },
          {
            node: {
              __typename: 'Comment',
              id: 'comment-8',
              body: 'Eighth comment',
              isPinned: false,
              created: '2024-04-22T19:18:58.505961+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              reactionsCount: {
                total: 0,
              },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
            cursor: 'cursor-8',
          },
          {
            node: {
              __typename: 'Comment',
              id: 'comment-9',
              body: 'Ninth comment',
              isPinned: false,
              created: '2024-04-22T19:18:58.505961+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              reactionsCount: {
                total: 0,
              },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
            cursor: 'cursor-9',
          },
          {
            node: {
              __typename: 'Comment',
              id: 'comment-10',
              body: 'Tenth comment',
              isPinned: false,
              created: '2024-04-22T19:18:58.505961+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              reactionsCount: {
                total: 0,
              },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
            cursor: 'cursor-10',
          },
        ],
      },
    },
  },
}

export const replytoCommentWithElevenRepliesMockData = {
  data: {
    node: {
      __typename: 'Comment',
      id: 'comment-with-eleven-replies',
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        fullName: 'John Doe',
        avatar: {
          url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
        },
      },
      created: '2024-04-17T19:53:45.601467+00:00',
      commentsCount: {
        total: 11,
      },
      canChange: true,
      canDelete: true,
      canReport: true,
      canPin: true,
      __isCommentsInterface: 'Comment',
      comments: {
        pageInfo: {
          endCursor: 'cursor-6',
          hasNextPage: true,
        },
        edges: [
          {
            node: {
              id: 'comment-1',
              isPinned: false,
              body: 'Newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              ted: '2024-08-26T14:45:51.772548+00:00',
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
              __typename: 'Comment',
            },
            cursor: 'cursor-1',
          },
          {
            node: {
              id: 'comment-2',
              isPinned: false,
              body: 'Second newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-25T14:44:51.772548+00:00',
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
              __typename: 'Comment',
            },
            cursor: 'cursor-2',
          },
          {
            node: {
              id: 'comment-3',
              isPinned: false,
              body: 'Third newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-24T14:43:51.772548+00:00',
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
              __typename: 'Comment',
            },
            cursor: 'cursor-3',
          },
          {
            node: {
              id: 'comment-4',
              isPinned: false,
              body: 'Fourth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-23T14:42:51.772548+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: true,
              canDelete: true,
              canReport: true,
              canPin: true,
              __isReactionsInterface: 'Comment',
              reactionsCount: {
                total: 3,
              },
              myReaction: null,
              __isCommentsInterface: 'Comment',
              __typename: 'Comment',
            },
            cursor: 'cursor-4',
          },
          {
            node: {
              id: 'comment-5',
              isPinned: false,
              body: 'Fifth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-22T14:41:51.772548+00:00',
              commentsCount: {
                total: 0,
              },
              canChange: true,
              canDelete: true,
              canReport: true,
              canPin: true,
              __isReactionsInterface: 'Comment',
              reactionsCount: {
                total: 2,
              },
              myReaction: null,
              __isCommentsInterface: 'Comment',
              __typename: 'Comment',
            },
            cursor: 'cursor-5',
          },
        ],
      },
      __isReactionsInterface: 'Comment',
      reactionsCount: {
        total: 0,
      },
      myReaction: null,
    },
  },
}

export const secondPageOfRepliesCommentWithElevenRepliesMockData = {
  data: {
    node: {
      __typename: 'Comment',
      id: 'comment-with-eleven-replies',
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        fullName: 'John Doe',
        avatar: {
          url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
        },
      },
      created: '2024-04-17T19:53:45.601467+00:00',
      commentsCount: {
        total: 11,
      },
      canChange: true,
      canDelete: true,
      canReport: true,
      canPin: true,
      __isCommentsInterface: 'Comment',
      comments: {
        pageInfo: {
          endCursor: 'cursor-11',
          hasNextPage: true,
        },
        edges: [
          {
            node: {
              id: 'comment-6',
              isPinned: false,
              body: 'Sixth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-21T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-6',
            },
          },
          {
            node: {
              id: 'comment-7',
              isPinned: false,
              body: 'Seventh newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-20T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-7',
            },
          },
          {
            node: {
              id: 'comment-8',
              isPinned: false,
              body: 'Eighth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-19T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-8',
            },
          },
          {
            node: {
              id: 'comment-9',
              isPinned: false,
              body: 'Ninth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-18T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-9',
            },
          },
          {
            node: {
              id: 'comment-10',
              isPinned: false,
              body: 'Tenth newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-17T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-10',
            },
          },
        ],
      },
      __isReactionsInterface: 'Comment',
      reactionsCount: {
        total: 0,
      },
      myReaction: null,
    },
  },
}

export const thirdPageOfRepliesCommentWithElevenRepliesMockData = {
  data: {
    node: {
      __typename: 'Comment',
      id: 'comment-with-eleven-replies',
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        fullName: 'John Doe',
        avatar: {
          url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
        },
      },
      created: '2024-04-17T19:53:45.601467+00:00',
      commentsCount: {
        total: 11,
      },
      canChange: true,
      canDelete: true,
      canReport: true,
      canPin: true,
      __isCommentsInterface: 'Comment',
      comments: {
        pageInfo: {
          endCursor: 'cursor-11',
          hasNextPage: false,
        },
        edges: [
          {
            node: {
              id: 'comment-11',
              isPinned: false,
              body: 'Eleventh newest reply',
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://nyc3.digitaloceanspaces.com/baseapp-production-storage/media/user-avatars/5/6/4/resized/50/50/185a04dfdaa512d218cf9b7a5097e3c9.png',
                },
              },
              created: '2024-08-16T14:45:51.772548+00:00',
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
              __typename: 'Comment',
              cursor: 'cursor-11',
            },
          },
        ],
      },
      __isReactionsInterface: 'Comment',
      reactionsCount: {
        total: 0,
      },
      myReaction: null,
    },
  },
}

export const commentsTestMockData = {
  data: {
    target: {
      id: 'test-id',
      __typename: 'Page',
      __isCommentsInterface: 'Page',
      isCommentsEnabled: true,
      commentsCount: { total: 2 },
      comments: {
        edges: [
          {
            node: {
              id: 'comment-1',
              __typename: 'Comment',
              body: 'This is a pinned comment.',
              isPinned: true,
              created: '2024-04-11T17:08:58.505961+00:00',
              commentsCount: { total: 0 },
              canChange: true,
              canDelete: true,
              canReport: true,
              canPin: true,
              user: {
                id: 'user-1',
                fullName: 'John Doe',
                avatar: {
                  url: 'https://cdn.example.com/avatar1.png',
                },
              },
              reactionsCount: { total: 2 },
              myReaction: null,
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
          },
          {
            node: {
              id: 'comment-2',
              __typename: 'Comment',
              body: 'This is a regular comment.',
              isPinned: false,
              created: '2024-04-21T19:18:58.505961+00:00',
              commentsCount: { total: 0 },
              canChange: false,
              canDelete: false,
              canReport: true,
              canPin: false,
              user: {
                id: 'user-2',
                fullName: 'Jane Smith',
                avatar: {
                  url: 'https://cdn.example.com/avatar2.png',
                },
              },
              reactionsCount: { total: 3 },
              myReaction: {
                id: 'reaction-1',
                reactionType: 'LIKE',
              },
              __isReactionsInterface: 'Comment',
              __isCommentsInterface: 'Comment',
            },
          },
        ],
        pageInfo: {
          endCursor: 'cursor-2',
          hasNextPage: false,
        },
      },
    },
  },
}

export const commentsWithNextPageMockData = {
  data: {
    target: {
      id: 'test-id',
      __typename: 'Page',
      __isCommentsInterface: 'Page',
      isCommentsEnabled: true,
      commentsCount: { total: 10 },
      comments: {
        edges: [
          {
            node: {
              __typename: 'Comment',
              id: 'comment-1',
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
                fullName: 'John Doe',
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
                fullName: 'John Doe',
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
                fullName: 'John Doe',
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
                fullName: 'John Doe',
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
                fullName: 'John Doe',
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
    },
  },
}

export const commentsWithElevenRepliesMockData = {
  data: {
    target: {
      id: 'test-id',
      __typename: 'Page',
      __isCommentsInterface: 'Page',
      isCommentsEnabled: true,
      commentsCount: { total: 5 },
      comments: {
        edges: [
          {
            node: {
              __typename: 'Comment',
              id: 'comment-with-eleven-replies',
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
                fullName: 'John Doe',
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
    },
  },
}
