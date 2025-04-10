export const mockResolvers = {
  Node: () => ({
    __typename: 'Message',
    id: 'msg-1',
    content: 'This is a mock message',
    created: new Date().toISOString(),
    deleted: false,
    extraData: null,
    inReplyTo: { id: 'msg-0' },
    isRead: true,
    pk: 12345,
    profile: { id: 'profile-123' },
    verb: 'SENT_MESSAGE',
  }),
}
