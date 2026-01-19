export const mockResolvers = {
  Node: () => ({
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
  }),
}
