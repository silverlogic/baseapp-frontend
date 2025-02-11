export const replytoCommentMockData = {
  data: {
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
              pk: 218,
              body: 'Some reply',
              user: {
                id: 'VXNlcjo0',
                pk: 4,
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
                pk: 220,
                body: 'reply',
                user: {
                  id: 'VXNlcjo0',
                  pk: 4,
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
                pk: 218,
                body: 'Some reply',
                user: {
                  id: 'VXNlcjo0',
                  pk: 4,
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
              pk: 6,
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
                pk: 1,
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
              pk: 7,
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
                pk: 1,
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
              pk: 8,
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
                pk: 1,
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
              pk: 9,
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
                pk: 1,
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
              pk: 10,
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
                pk: 1,
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
      pk: 11,
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        pk: 1,
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
              pk: 221,
              body: 'Newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 202,
              body: 'Second newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 200,
              body: 'Third newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 141,
              body: 'Fourth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 134,
              body: 'Fifth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
      pk: 11,
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        pk: 1,
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
              pk: 221,
              body: 'Sixth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 222,
              body: 'Seventh newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 223,
              body: 'Eighth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 224,
              body: 'Ninth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
              pk: 225,
              body: 'Tenth newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
      pk: 11,
      body: 'This is comment with eleven replies.',
      isPinned: false,
      user: {
        id: 'user-1',
        pk: 1,
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
              pk: 226,
              body: 'Eleventh newest reply',
              user: {
                id: 'user-1',
                pk: 1,
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
