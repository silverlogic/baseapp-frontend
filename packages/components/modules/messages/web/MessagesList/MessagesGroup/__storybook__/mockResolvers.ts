export const mockResolvers = {
  Node: () => ({
    __typename: 'Message',
    id: 'msg-1',
    content: 'Hello',
    created: new Date().toISOString(),
    deleted: false,
    extraData: null,
    inReplyTo: null,
    isRead: false,
    verb: 'SENT_MESSAGE',
    profile: {
      id: 'profile-123',
      name: 'Você',
      image: {
        url: '',
      },
    },
    messageType: 'USER_MESSAGE',
  }),
}
