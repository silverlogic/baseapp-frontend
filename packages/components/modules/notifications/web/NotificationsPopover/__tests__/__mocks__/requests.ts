export const unreadNotificationsMockData = {
  data: { me: { id: 'user-1', notificationsUnreadCount: 2 } },
}

export const unreadNotificationsEmptyMockData = {
  data: { me: { id: 'user-1', notificationsUnreadCount: 0 } },
}

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

export const notificationsListNextPageMockData = {
  data: {
    node: {
      __typename: 'User',
      id: 'user-1',
      notificationsUnreadCount: 12,
      notifications: {
        edges: [
          {
            cursor: 'cursor-11',
            node: {
              id: 'notification-11',
              unread: true,
              timestamp: '2024-10-25T19:44:04.842468+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment.',
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
                id: 'Q29tbWVudDoyMzg=',
                __typename: 'Comment',
                body: 'This is the eleventh comment reply.',
              },
              __typename: 'Notification',
            },
          },
          {
            cursor: 'cursor-12',
            node: {
              id: 'notification-12',
              unread: true,
              timestamp: '2024-10-25T19:43:25.029654+00:00',
              level: 'INFO',
              verb: 'COMMENTS.COMMENT_REPLY_CREATED',
              description: 'Someone replied to your comment.',
              data: {
                extra: {},
              },
              actor: {
                __typename: 'Profile',
                id: 'UHJvZmlsZToxNTM=',
              },
              target: {
                id: 'Q29tbWVudDoyMzI=',
                __typename: 'Comment',
              },
              actionObject: {
                id: 'Q29tbWVudDoyMzc=',
                __typename: 'Comment',
                body: 'This is the twelfth comment reply.',
              },
              __typename: 'Notification',
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: 'cursor-12',
        },
      },
    },
  },
}

export const markNotificationAsReadMockData = {
  data: {
    notificationsMarkAsRead: {
      recipient: {
        __typename: 'User',
        id: 'user-1',
        notificationsUnreadCount: 11,
      },
      notifications: [
        {
          id: 'notification-12',
          unread: false,
        },
      ],
    },
  },
}
