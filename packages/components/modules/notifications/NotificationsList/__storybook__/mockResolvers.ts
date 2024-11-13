export const emptyNotificationsListMockData = {
  data: {
    me: {
      id: 'user-1',
      notificationsUnreadCount: 12,
      notifications: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      },
    },
  },
}

export const notificationsListMockData = {
  data: {
    me: {
      id: 'user-1',
      notificationsUnreadCount: 12,
      notifications: {
        edges: [
          {
            cursor: 'cursor-1',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyNQ==',
              unread: true,
              pk: 225,
              timestamp: '2024-10-25T19:46:09.288290+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 1.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDg=',
                __typename: 'Comment',
                body: 'This is the first comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-2',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyNA==',
              unread: true,
              pk: 224,
              timestamp: '2024-10-25T19:46:05.469607+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 2.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDc=',
                __typename: 'Comment',
                body: 'This is the second comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-3',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyMw==',
              unread: true,
              pk: 223,
              timestamp: '2024-10-25T19:45:37.278737+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 3.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDY=',
                __typename: 'Comment',
                body: 'This is the third comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-4',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyMg==',
              unread: true,
              pk: 222,
              timestamp: '2024-10-25T19:44:54.738158+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 4.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDU=',
                __typename: 'Comment',
                body: 'This is the fourth comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-5',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyMQ==',
              unread: true,
              pk: 221,
              timestamp: '2024-10-25T19:44:51.597059+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 5.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDQ=',
                __typename: 'Comment',
                body: 'This is the fifth comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-6',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIyMA==',
              unread: true,
              pk: 220,
              timestamp: '2024-10-25T19:44:43.404373+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 6.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDM=',
                __typename: 'Comment',
                body: 'This is the sixth comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-7',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIxOQ==',
              unread: true,
              pk: 219,
              timestamp: '2024-10-25T19:44:40.187542+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 7.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDI=',
                __typename: 'Comment',
                body: 'This is the seventh comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-8',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIxOA==',
              unread: true,
              pk: 218,
              timestamp: '2024-10-25T19:44:37.056281+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 8.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDE=',
                __typename: 'Comment',
                body: 'This is the eighth comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-9',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIxNw==',
              unread: true,
              pk: 217,
              timestamp: '2024-10-25T19:44:32.462967+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 9.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyNDA=',
                __typename: 'Comment',
                body: 'This is the ninth comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-10',
            node: {
              id: 'Tm90aWZpY2F0aW9uOjIxNg==',
              unread: true,
              pk: 216,
              timestamp: '2024-10-25T19:44:23.109884+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment 10.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyMzk=',
                __typename: 'Comment',
                body: 'This is the tenth comment reply.',
              },
              __typename: 'Notification',
            },
          },
        ],
        pageInfo: {
          hasNextPage: true,
          endCursor: 'cursor-10',
        },
      },
    },
  },
}
