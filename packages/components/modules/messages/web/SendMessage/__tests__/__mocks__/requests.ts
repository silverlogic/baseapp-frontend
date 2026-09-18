/**
 * Deterministic fixtures — no `faker`, so the spec can import them directly and
 * derive expected values from the same source the stories render.
 */
export const TEST_ROOM_ID = 'test-chat-room-id'

export const MESSAGE = 'Hello from the component test'

export const currentProfileMock = {
  id: 'test-profile-id',
  name: 'Test Profile',
  image: null,
  urlPath: null,
}

/** The one string every failure path in `SendMessage` toasts. */
export const SEND_MESSAGE_ERROR_TOAST = 'Your last message could not be sent. Please try again.'

export const TRANSPORT_ERROR_MESSAGE = 'Network request failed'

export const PAYLOAD_ERROR_MESSAGE = 'That message was rejected by the server.'

/** Names the react-hook-form field, so `setFormRelayErrors` can place it. */
export const sendMessageBodyErrorsMock = [{ field: 'body', messages: [PAYLOAD_ERROR_MESSAGE] }]

/**
 * Names the GraphQL input field. The form has no `content` field, so
 * `setFormRelayErrors` drops it — the toast is all the user gets.
 */
export const sendMessageInputFieldErrorsMock = [
  { field: 'content', messages: [PAYLOAD_ERROR_MESSAGE] },
]

const sentMessageNode = {
  id: 'test-sent-message-id',
  content: MESSAGE,
  created: '2026-01-01T00:00:00.000Z',
  deleted: false,
  extraData: null,
  messageType: 'USER_MESSAGE',
  inReplyTo: null,
  isRead: true,
  profile: { id: currentProfileMock.id },
  verb: 'SENT_MESSAGE',
}

/**
 * `errors` is nullable in the schema, so a successful send can legitimately come
 * back as `null` or as `[]`. The two are separate fixtures because the component
 * treats them differently.
 */
const sendMessageResponse = (errors: unknown) => ({
  data: {
    chatRoomSendMessage: {
      message: { node: sentMessageNode },
      errors,
    },
  },
})

export const sendMessageSuccessMockData = sendMessageResponse(null)
export const sendMessageEmptyErrorsMockData = sendMessageResponse([])
export const sendMessageBodyErrorsMockData = sendMessageResponse(sendMessageBodyErrorsMock)
export const sendMessageInputFieldErrorsMockData = sendMessageResponse(
  sendMessageInputFieldErrorsMock,
)
