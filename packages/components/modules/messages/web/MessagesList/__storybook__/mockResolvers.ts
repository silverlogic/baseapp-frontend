export const mockResolvers = {
  ChatRoom: () => ({
    id: 'room-123',
    isGroup: true,
    unreadMessages: {
      count: 1,
      markedUnread: false,
    },
    allMessages: {
      totalCount: 3,
      edges: [
        {
          node: {
            id: 'msg-3',
            created: new Date().toISOString(),
            profile: {
              id: 'profile-456',
              name: 'Alice',
              image: {
                url: '',
              },
            },
            isRead: false,
            messageType: 'USER_MESSAGE',
            content: 'Me too! How was your day?',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
          },
        },
        {
          node: {
            id: 'msg-2',
            created: new Date().toISOString(),
            profile: {
              id: 'profile-123',
              name: 'Você',
              image: {
                url: '',
              },
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: "I'm fine! And you?",
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
          },
        },
        {
          node: {
            id: 'msg-1',
            created: new Date().toISOString(),
            profile: {
              id: 'profile-456',
              name: 'Alice',
              image: {
                url: '',
              },
            },
            isRead: true,
            messageType: 'USER_MESSAGE',
            content: 'Hey, how are you?',
            deleted: false,
            extraData: null,
            inReplyTo: null,
            verb: 'SENT_MESSAGE',
          },
        },
      ],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    },
  }),
}
