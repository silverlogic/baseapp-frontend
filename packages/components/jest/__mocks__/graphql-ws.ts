jest.mock('graphql-ws', () => ({
  createClient: jest.fn(() => ({
    subscribe: jest.fn((operation, sink) => {
      sink.next && sink.next({ data: {} })
      sink.complete && sink.complete()
    }),
  })),
}))
