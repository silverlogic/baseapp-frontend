import { FC, useCallback, useEffect, useState } from 'react'

import { useLazyLoadQuery, useQueryLoader } from 'react-relay'

import { ChatRoomsQuery as ChatRoomsQueryType } from '../../../../../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../../../../__generated__/GroupDetailsQuery.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import { ChatRoomProvider, ChatRoomsQuery, GroupDetailsQuery } from '../../../../../common'
import GroupChatEdit from '../../../index'
import { GroupChatEditProps } from '../../../types'
import { CURRENT_PROFILE_ID, TEST_ROOM_ID } from '../../__mocks__/requests'

interface GroupChatEditForTestingProps {
  /**
   * The `roomId` prop, kept separate from the id the query is loaded with so a
   * story can render the component without one while still seeding the group.
   */
  roomId?: string
  GroupChatEditProps?: Partial<GroupChatEditProps>
}

/**
 * `GroupChatEdit` takes a `PreloadedQuery`, not a fragment ref, and reads
 * `allProfilesRef` out of a second query — so the harness has to run both
 * inside the Relay provider. `ChatRoomsQuery` is the only query that spreads
 * `AllProfilesListFragment`, hence its presence here.
 *
 * `useRoomListSubscription` calls `useChatRoom()`, which throws without
 * `ChatRoomProvider`.
 *
 * The three callbacks are recorded as counts in a hidden form: a Node-side spy
 * could neither drive the browser state nor distinguish "called once" from
 * "called at mount and again on click".
 */
const GroupChatEditForTesting: FC<GroupChatEditForTestingProps> = ({
  roomId,
  GroupChatEditProps = {},
}) => {
  const [cancellationCount, setCancellationCount] = useState(0)
  const [validSubmissionCount, setValidSubmissionCount] = useState(0)
  const [removalCount, setRemovalCount] = useState(0)

  // Stable identities: `useRoomListSubscription` memoises its config on the
  // callback identity, so a new closure per render would resubscribe endlessly.
  const onCancellation = useCallback(() => setCancellationCount((count) => count + 1), [])
  const onValidSubmission = useCallback(() => setValidSubmissionCount((count) => count + 1), [])
  const onRemovalFromGroup = useCallback(() => setRemovalCount((count) => count + 1), [])

  const allProfilesRef = useLazyLoadQuery<ChatRoomsQueryType>(ChatRoomsQuery, {
    profileId: CURRENT_PROFILE_ID,
  })

  const [queryRef, loadGroupDetailsQuery] = useQueryLoader<GroupDetailsQueryType>(GroupDetailsQuery)

  useEffect(() => {
    loadGroupDetailsQuery({ roomId: TEST_ROOM_ID }, { fetchPolicy: 'network-only' })
  }, [loadGroupDetailsQuery])

  return (
    <ChatRoomProvider>
      {queryRef && (
        <GroupChatEdit
          allProfilesRef={allProfilesRef}
          onCancellation={onCancellation}
          onRemovalFromGroup={onRemovalFromGroup}
          onValidSubmission={onValidSubmission}
          queryRef={queryRef}
          roomId={roomId}
          {...GroupChatEditProps}
        />
      )}
      <form hidden>
        <input data-testid="cancellation-count" readOnly value={String(cancellationCount)} />
        <input data-testid="valid-submission-count" readOnly value={String(validSubmissionCount)} />
        <input data-testid="removal-count" readOnly value={String(removalCount)} />
      </form>
    </ChatRoomProvider>
  )
}

export default withComponentCompleteTestProviders(GroupChatEditForTesting)
