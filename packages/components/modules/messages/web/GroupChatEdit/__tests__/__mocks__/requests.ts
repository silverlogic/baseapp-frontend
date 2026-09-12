/**
 * Deterministic fixtures — no `faker`, so the spec imports them directly and
 * derives expected values from the same source the stories render.
 *
 * Shapes follow the generated operation text rather than the hand-written
 * documents: the `@connection` directive adds `cursor`/`endCursor`, and
 * `ProfileItemFragment` selects `urlPath { path id }`. A field missing from a
 * payload normalises to `undefined` and the component silently renders nothing,
 * so the fixtures mirror the generated selections exactly.
 */

export const TEST_ROOM_ID = 'Q2hhdFJvb206dGVzdC1yb29t'

export const GROUP_TITLE = 'Design Team'

/**
 * Inline images, because MUI's `Avatar` swaps the `<img>` for its fallback as
 * soon as the load errors — a remote URL that never resolves would make every
 * `img[src=…]` assertion race the network.
 */
export const GROUP_IMAGE_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxMjM0NTYiLz48L3N2Zz4='

export const PROFILE_IMAGE_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM2NTQzMjEiLz48L3N2Zz4='

const profileNode = (id: string, name: string, path: string) => ({
  __typename: 'Profile',
  id,
  name,
  image: { url: PROFILE_IMAGE_URL },
  urlPath: { __typename: 'URLPath', id: `${id}-url-path`, path },
})

export const CURRENT_PROFILE_ID = 'UHJvZmlsZTpjdXJyZW50'

export const currentProfileNode = profileNode(CURRENT_PROFILE_ID, 'Current Profile', 'current')

/** A participant of the group, and therefore not addable again. */
export const adaProfileNode = profileNode('UHJvZmlsZTphZGE', 'Ada Lovelace', 'ada')

/** A second participant, so removing Ada does not empty the list. */
export const graceProfileNode = profileNode('UHJvZmlsZTpncmFjZQ', 'Grace Hopper', 'grace')

/** In `allProfiles` but not in the group — the addable case. */
export const alanProfileNode = profileNode('UHJvZmlsZTphbGFu', 'Alan Turing', 'alan')

/** A second addable profile, for asserting selection of more than one. */
export const katherineProfileNode = profileNode(
  'UHJvZmlsZTprYXRoZXJpbmU',
  'Katherine Johnson',
  'katherine',
)

/** Only ever returned by a search refetch, never by the first page. */
export const gladysProfileNode = profileNode('UHJvZmlsZTpnbGFkeXM', 'Gladys West', 'gladys')

/** Arrives with the second page of participants. */
export const edsgerProfileNode = profileNode('UHJvZmlsZTplZHNnZXI', 'Edsger Dijkstra', 'edsger')

/** The `CurrentProfile` cookie value the authentication harness seeds. */
export const currentProfileMock = {
  id: CURRENT_PROFILE_ID,
  name: currentProfileNode.name,
  image: null,
  urlPath: null,
}

export const PARTICIPANT_ROLES = { admin: 'ADMIN', member: 'MEMBER' } as const

type ParticipantRole = (typeof PARTICIPANT_ROLES)[keyof typeof PARTICIPANT_ROLES]

type ProfileNodeMock = ReturnType<typeof profileNode>

/**
 * `removedParticipants { id @deleteEdge }` matches on the *participant* id, not
 * the profile id, so the two are kept distinguishable.
 */
export const participantIdFor = (profile: ProfileNodeMock) =>
  `Q2hhdFJvb21QYXJ0aWNpcGFudDo${profile.id}`

const participantEdge = (profile: ProfileNodeMock, role: ParticipantRole) => ({
  cursor: `cursor-${profile.id}`,
  node: {
    __typename: 'ChatRoomParticipant',
    id: participantIdFor(profile),
    profile,
    role,
  },
})

const profileEdge = (profile: ProfileNodeMock) => ({
  cursor: `cursor-${profile.id}`,
  node: profile,
})

const connection = <T>(edges: T[], hasNextPage = false) => ({
  edges,
  pageInfo: {
    hasNextPage,
    endCursor: hasNextPage ? `cursor-page-1` : null,
  },
})

const groupDetailsResponse = ({
  participants,
  hasNextPage = false,
  image = GROUP_IMAGE_URL,
  title = GROUP_TITLE,
}: {
  participants: ReturnType<typeof participantEdge>[]
  hasNextPage?: boolean
  image?: string | null
  title?: string | null
}) => ({
  data: {
    chatRoom: {
      __typename: 'ChatRoom',
      id: TEST_ROOM_ID,
      participantsCount: participants.length,
      participantIds: participants.map((edge) => edge.node.profile.id),
      isArchived: false,
      isSoleAdmin:
        participants.filter((edge) => edge.node.role === PARTICIPANT_ROLES.admin).length === 1,
      image: image ? { url: image } : null,
      title,
      otherParticipant: null,
      participants: connection(participants, hasNextPage),
    },
  },
})

/** The signed-in profile is the group's only admin. */
export const groupDetailsMockData = groupDetailsResponse({
  participants: [
    participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
    participantEdge(adaProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(graceProfileNode, PARTICIPANT_ROLES.member),
  ],
})

/** Same group, no avatar — the "Upload Avatar" half of the image affordances. */
export const groupWithoutImageMockData = groupDetailsResponse({
  participants: [
    participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
    participantEdge(adaProfileNode, PARTICIPANT_ROLES.member),
  ],
  image: null,
})

/** The signed-in profile is a plain member and Ada is the admin. */
export const groupWhereCurrentProfileIsMemberMockData = groupDetailsResponse({
  participants: [
    participantEdge(currentProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(adaProfileNode, PARTICIPANT_ROLES.admin),
  ],
})

/** No participants at all, for the empty state. */
export const groupWithoutMembersMockData = groupDetailsResponse({ participants: [] })

/** A full first page with another page behind it. */
export const paginatedGroupDetailsMockData = groupDetailsResponse({
  participants: [
    participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
    participantEdge(adaProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(graceProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(alanProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(katherineProfileNode, PARTICIPANT_ROLES.member),
  ],
  hasNextPage: true,
})

/** The second page of participants, keyed on the ChatRoom node. */
export const nextParticipantsPageMockData = {
  data: {
    node: {
      __typename: 'ChatRoom',
      id: TEST_ROOM_ID,
      participants: connection([participantEdge(edsgerProfileNode, PARTICIPANT_ROLES.member)]),
    },
  },
}

const allProfilesConnection = (profiles: ProfileNodeMock[], hasNextPage = false) => ({
  totalCount: profiles.length,
  ...connection(profiles.map(profileEdge), hasNextPage),
})

/**
 * `ChatRoomsQuery` is the only query that spreads `AllProfilesListFragment`, so
 * the harness runs it purely to obtain `allProfilesRef`. `profile` is filled in
 * only far enough to satisfy `RoomsListFragment`, which nothing under test reads.
 */
export const chatRoomsMockData = {
  data: {
    allProfiles: allProfilesConnection([
      adaProfileNode,
      alanProfileNode,
      currentProfileNode,
      graceProfileNode,
      katherineProfileNode,
    ]),
    profile: {
      __typename: 'Profile',
      __isChatRoomsInterface: 'Profile',
      id: CURRENT_PROFILE_ID,
      chatRooms: connection([]),
    },
  },
}

/** What a search refetch of `allProfiles` returns when it matches something. */
export const profilesSearchMatchMockData = {
  data: { allProfiles: allProfilesConnection([gladysProfileNode]) },
}

/** ... and when it matches nothing. */
export const profilesSearchEmptyMockData = {
  data: { allProfiles: allProfilesConnection([]) },
}

/**
 * `UpdateChatRoomMutation` selects `LastMessageFragment`, `TitleFragment`,
 * `UnreadMessagesCountFragment` and `MembersListFragment` on the returned room,
 * so every response has to carry the whole node or the store logs missing-field
 * warnings and the members list re-renders empty.
 */
const updatedRoomNode = (participants: ReturnType<typeof participantEdge>[]) => ({
  __typename: 'ChatRoom',
  id: TEST_ROOM_ID,
  participantsCount: participants.length,
  isGroup: true,
  isSoleAdmin: true,
  isArchived: false,
  title: GROUP_TITLE,
  image: { url: GROUP_IMAGE_URL },
  otherParticipant: null,
  lastMessageTime: '2026-01-01T00:00:00.000Z',
  lastMessage: { __typename: 'Message', id: 'TWVzc2FnZTox', content: 'Welcome' },
  unreadMessages: {
    __typename: 'UnreadMessageCount',
    id: 'VW5yZWFkOjE',
    count: 0,
    markedUnread: false,
  },
  participants: connection(participants),
})

const unchangedParticipants = [
  participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
  participantEdge(adaProfileNode, PARTICIPANT_ROLES.member),
  participantEdge(graceProfileNode, PARTICIPANT_ROLES.member),
]

/** Ada is gone: what the server returns once her removal succeeded. */
const participantsWithoutAda = [
  participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
  participantEdge(graceProfileNode, PARTICIPANT_ROLES.member),
]

const chatRoomUpdateResponse = ({
  errors = null,
  removedParticipants = [],
  participants = unchangedParticipants,
}: {
  errors?: unknown
  removedParticipants?: { id: string }[]
  participants?: ReturnType<typeof participantEdge>[]
} = {}) => ({
  data: {
    chatRoomUpdate: {
      room: { node: updatedRoomNode(participants) },
      removedParticipants: removedParticipants.map(({ id }) => ({
        __typename: 'ChatRoomParticipant',
        id,
      })),
      errors,
    },
  },
})

/** The one string both `GroupChatEdit` and `AddMembersDialog` toast on failure. */
export const UPDATE_ERROR_TOAST = 'Something went wrong'

export const TRANSPORT_ERROR_MESSAGE = 'Network request failed'

export const TOP_LEVEL_ERROR_MESSAGE = 'The chat room service is unavailable.'

export const PAYLOAD_ERROR_MESSAGE = 'That title is already taken.'

/** Names the react-hook-form field, so `setFormRelayErrors` can place it. */
export const titleFieldErrorsMock = [{ field: 'title', messages: [PAYLOAD_ERROR_MESSAGE] }]

/**
 * Names a GraphQL input field the form has no counterpart for, so
 * `setFormRelayErrors` drops it and the toast is all the user gets.
 */
export const unknownFieldErrorsMock = [
  { field: 'clientMutationId', messages: [PAYLOAD_ERROR_MESSAGE] },
]

export const updateSuccessMockData = chatRoomUpdateResponse()

/** `errors: []` — a success the component reads as a failure. */
export const updateEmptyErrorsMockData = chatRoomUpdateResponse({ errors: [] })

export const updateTitleErrorMockData = chatRoomUpdateResponse({ errors: titleFieldErrorsMock })

export const updateUnknownFieldErrorMockData = chatRoomUpdateResponse({
  errors: unknownFieldErrorsMock,
})

/** A GraphQL-level error alongside a payload that reports no errors of its own. */
export const updateTopLevelErrorsMockData = {
  ...chatRoomUpdateResponse(),
  errors: [{ message: TOP_LEVEL_ERROR_MESSAGE }],
}

/** Ada leaves the group: the edge is deleted from `ChatRoom_participants`. */
export const removeAdaMockData = chatRoomUpdateResponse({
  removedParticipants: [{ id: participantIdFor(adaProfileNode) }],
  participants: participantsWithoutAda,
})

export const removeParticipantErrorMockData = chatRoomUpdateResponse({
  errors: [{ field: 'removeParticipants', messages: [PAYLOAD_ERROR_MESSAGE] }],
})

/** Alan joins the group. */
export const addAlanMockData = chatRoomUpdateResponse({
  participants: [
    participantEdge(currentProfileNode, PARTICIPANT_ROLES.admin),
    participantEdge(adaProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(graceProfileNode, PARTICIPANT_ROLES.member),
    participantEdge(alanProfileNode, PARTICIPANT_ROLES.member),
  ],
})

/** The refetch a members search triggers, answered with the membership unchanged. */
export const participantsRefetchMockData = {
  data: {
    node: {
      __typename: 'ChatRoom',
      id: TEST_ROOM_ID,
      participants: connection(unchangedParticipants),
    },
  },
}

/**
 * `useRoomListSubscription` calls `onRemoval` only when `removedParticipants`
 * names the signed-in profile, so the two payloads differ in exactly that.
 */
const roomUpdateSubscriptionPayload = (removedProfile: ProfileNodeMock) => ({
  data: {
    chatRoomOnRoomUpdate: {
      room: { node: updatedRoomNode(unchangedParticipants) },
      removedParticipants: [
        {
          __typename: 'ChatRoomParticipant',
          id: participantIdFor(removedProfile),
          profile: { __typename: 'Profile', id: removedProfile.id },
        },
      ],
    },
  },
})

export const currentProfileRemovedSubscriptionMockData =
  roomUpdateSubscriptionPayload(currentProfileNode)

export const otherProfileRemovedSubscriptionMockData = roomUpdateSubscriptionPayload(adaProfileNode)

/** Names the dialog's `participants` field, so the error lands on the selection. */
export const addParticipantsErrorMockData = chatRoomUpdateResponse({
  errors: [{ field: 'participants', messages: [PAYLOAD_ERROR_MESSAGE] }],
})
