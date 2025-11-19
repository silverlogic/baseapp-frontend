export const mockResolverGroup = {
  ChatRoom: () => ({
    id: 'room-123',
    isArchived: false,
    participantsCount: 3,
    isGroup: true,
    participants: {
      edges: [
        {
          node: {
            profile: {
              id: 'UHJvZmlsZToxNzM=',
              name: 'John',
              image: null,
            },
            role: 'MEMBER',
            id: 'Q2hhdFJvb21QYXJ0aWNpcGFudDoxNA==',
          },
        },
        {
          node: {
            profile: {
              id: 'UHJvZmlsZToxNTM=',
              name: 'Priscilla',
              image: null,
            },
            role: 'ADMIN',
            id: 'Q2hhdFJvb21QYXJ0aWNpcGFudDoxNg==',
          },
        },
      ],
    },
    image: null,
    title: 'TSL',
    unreadMessages: {
      count: 0,
      markedUnread: false,
      id: 'VW5yZWFkTWVzc2FnZUNvdW50OjIw',
    },
    allMessages: {
      totalCount: 6,
      edges: [
        {
          node: {
            id: 'TWVzc2FnZToxOQ==DKS',
            created: '2025-03-25T03:42:31.004711+00:00',
            profile: {
              id: 'UHJvZmlsZToxNzsdM=',
              name: 'Alex',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'Hey guys!',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0zxaW9uOjA=',
        },
        {
          node: {
            id: 'TWVzc2FnZToxOQ==',
            created: '2025-03-24T03:42:31.004711+00:00',
            profile: {
              id: 'UHJvZmlsZToxNzM=',
              name: 'John',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'Hello Priscilla!',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
        },
        {
          node: {
            id: 'TWVzc2FnZToxNQ==',
            created: '2025-03-24T01:23:19.810162+00:00',
            profile: {
              id: 'UHJvZmlsZToxNTM=',
              name: 'Priscilla',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'Hello everyone',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
        },
        {
          node: {
            id: 'TWVzc2FnZToxNA==',
            created: '2025-03-24T01:23:15.065540+00:00',
            profile: null,
            isRead: null,
            messageType: 'SYSTEM_GENERATED',
            content: 'Priscilla created group "TSL"',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjU=',
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: 'YXJyYXljb25uZWN0aW9uOjU=',
      },
    },
  }),
}

export const mockResolverPrivate = {
  ChatRoom: () => ({
    id: 'room-123',
    isArchived: false,
    participantsCount: 2,
    isGroup: false,
    participants: {
      edges: [
        {
          node: {
            profile: {
              id: 'UHJvZmlsZToxNzM=',
              name: 'John',
              image: null,
            },
            role: 'ADMIN',
            id: 'Q2hhdFJvb21QYXJ0aWNpcGFudDoxMw==',
          },
        },
        {
          node: {
            profile: {
              id: 'UHJvZmlsZToxNTM=',
              name: 'Priscilla',
              image: null,
            },
            role: 'MEMBER',
            id: 'Q2hhdFJvb21QYXJ0aWNpcGFudDoxMg==',
          },
        },
      ],
    },
    image: null,
    title: null,
    unreadMessages: {
      count: 0,
      markedUnread: false,
      id: 'VW5yZWFkTWVzc2FnZUNvdW50OjE5',
    },
    allMessages: {
      totalCount: 4,
      edges: [
        {
          node: {
            id: 'TWVzc2FnZToyMQ==',
            created: '2025-03-27T02:31:22.786185+00:00',
            profile: {
              id: 'UHJvZmlsZToxNTM=',
              name: 'Priscilla',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'fine and you?',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
        },
        {
          node: {
            id: 'TWVzc2FnZToyMA==',
            created: '2025-03-27T02:30:01.484497+00:00',
            profile: {
              id: 'UHJvZmlsZToxNzM=',
              name: 'John',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'how are you?',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
        },
        {
          node: {
            id: 'TWVzc2FnZToxMw==',
            created: '2025-03-24T01:15:25.749043+00:00',
            profile: {
              id: 'UHJvZmlsZToxNTM=',
              name: 'Priscilla',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'This message was deleted',
            deleted: true,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
        },
        {
          node: {
            id: 'TWVzc2FnZToxMg==',
            created: '2025-03-24T01:14:45.029307+00:00',
            profile: {
              id: 'UHJvZmlsZToxNzM=',
              name: 'John',
              image: null,
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'Hello, Priscilla!',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
            __typename: 'Message',
          },
          cursor: 'YXJyYXljb25uZWN0aW9uOjM=',
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: 'YXJyYXljb25uZWN0aW9uOjM=',
      },
    },
  }),
}
