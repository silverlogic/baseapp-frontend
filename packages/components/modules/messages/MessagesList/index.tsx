import { useEffect, useRef, useState } from 'react'

import {
  DATE_FORMAT,
  datesDontHaveSameDay,
  formatDate,
  isToday,
  isYesterday,
} from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'
import { usePaginationFragment } from 'react-relay'

import { ChatRoomMessagesListPaginationQuery } from '../../../__generated__/ChatRoomMessagesListPaginationQuery.graphql'
import { MessagesListFragment$key } from '../../../__generated__/MessagesListFragment.graphql'
import { Timestamp } from '../../__shared__'
// import useInfiniteScrollUp from '../hooks/useInfinityScrollUp'
import MessageItem from '../MessageItem'
import { MessagesListFragment } from '../graphql/queries/MessagesList'
import useMessagesListSubscription from '../graphql/subscriptions/useMessagesListSubscription'

// export const fragmentQuery = graphql`
//   fragment MessagesListFragment on Room
//   @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, cursor: { type: "String" })
//   @refetchable(queryName: "chatMessagesListPaginationQuery") {
//     id
//     activeProposal {
//       id
//       status
//     }
//     allMessages(first: $count, after: $cursor) @connection(key: "chat_chatRoom_allMessages") {
//       edges {
//         node {
//           id
//           content
//           created
//           actor {
//             id
//           }
//           ...MessageItemFragment
//         }
//       }
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//     }
//   }
// `

// const readMessagesMutation = graphql`
//   mutation MessagesListReadMutation($input: ReadMessagesInput!, $profileId: ID!) {
//     readMessages(input: $input) {
//       room {
//         id
//         unreadMessagesCount(profileId: $profileId)
//         activeProposal {
//           id
//           status
//         }
//       }
//       user {
//         id
//         unreadMessagesCount(profileId: $profileId)
//       }
//       errors {
//         field
//         messages
//       }
//     }
//   }
// `

type MessagesListProps = {
  roomRef: MessagesListFragment$key
  profileId: string
}

const MessagesList = ({ roomRef, profileId }: MessagesListProps) => {
  const {
    data: room,
    // loadNext,
    isLoadingNext,
    // hasNext,
  } = usePaginationFragment<ChatRoomMessagesListPaginationQuery, MessagesListFragment$key>(
    MessagesListFragment,
    roomRef,
  )

  // const [commitMutation, isMutationInFlight] = useMutation(readMessagesMutation)
  // const { currentProfile } = useCurrentProfile()
  const currentProfile = { id: profileId } // TODO: use current profile hook when it is available

  // const sentinelRef = useRef<HTMLDivElement>(null)

  const allMessagesLastIndex = Number(room?.allMessages?.edges?.length) - 1

  // useInfiniteScrollUp({
  //   callback: () => loadNext(5),
  //   targetRef: sentinelRef,
  //   isLoading: isLoadingNext,
  //   hasNextPage: hasNext,
  // })

  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollableContainerRef = useRef<HTMLDivElement>(null)
  const [latestMessageId, setLatestMessageId] = useState<string | null>(null)

  // const scrollToBottom = () => {
  //   if (scrollableContainerRef.current) {
  //     scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight
  //   }
  // }

  useEffect(() => {
    const currentLatestMessage = room?.allMessages?.edges[0]?.node
    if (currentLatestMessage && !latestMessageId) {
      setLatestMessageId(currentLatestMessage?.id)
      return
    }
    if (currentLatestMessage && currentLatestMessage.id !== latestMessageId) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setLatestMessageId(currentLatestMessage.id)
    }
  }, [room?.allMessages?.edges])

  useMessagesListSubscription(room?.id)

  const isFirstMessageFromOtherParticipant = (index: number) => {
    const nextMessage = room?.allMessages?.edges?.[index - 1]?.node
    const currentMessage = room?.allMessages?.edges?.[index]?.node
    if (currentMessage?.profile?.id === currentProfile?.id) return false
    if (nextMessage?.profile?.id !== currentMessage?.profile?.id) return true
    if (allMessagesLastIndex === 0) return true
    return false
  }

  const isLastMessageFromAnyParticipant = (index: number) => {
    const nextMessage = room?.allMessages?.edges?.[index - 1]?.node
    const currentMessage = room?.allMessages?.edges?.[index]?.node
    if (nextMessage?.profile?.id !== currentMessage?.profile?.id) return true
    return false
  }

  const showLastMessageTime = (index: number, isOwnMessage?: boolean) => {
    const currentMessage = room?.allMessages?.edges?.[index]?.node
    if (!isLastMessageFromAnyParticipant(index)) return null

    return (
      <Typography
        color="surface.600"
        variant="overline"
        sx={{ px: 1, py: 0.5, mt: 0.5, textAlign: isOwnMessage ? 'right' : 'left' }}
      >
        <Timestamp date={currentMessage?.created} isMessages />
      </Typography>
    )
  }

  const displayFormatedDate = (date: string) => {
    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    return formatDate(date, { toFormat: DATE_FORMAT[2] })
  }

  const showDayOnTopOfGroupedMessages = (index: number) => {
    const previousMessage = room?.allMessages?.edges?.[index + 1]?.node
    const currentMessage = room?.allMessages?.edges?.[index]?.node

    if (
      !previousMessage ||
      datesDontHaveSameDay(previousMessage?.created, currentMessage?.created)
    ) {
      return (
        <Box
          sx={{
            alignSelf: 'center',
            px: 1,
            py: 0.5,
            bgcolor: 'surface.200',
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Typography color="surface.700" variant="caption" sx={{ textAlign: 'center' }}>
            {displayFormatedDate(currentMessage?.created)}
          </Typography>
        </Box>
      )
    }
    return null
  }

  return (
    <Box
      ref={scrollableContainerRef}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '12px',
        borderTopLeftRadius: 0,
        display: 'flex',
        flexDirection: 'column-reverse',
        p: 3,
        pb: {
          zero: 2,
          sm: 2,
        },
        gap: 0.5,
        overflowY: 'auto',
        height: {
          // zero: isMakeProposalButtonVisible ? 'calc(100% - 152px)' : 'calc(100% - 75px)',
          sm: 'calc(100% - 75px)',
          md: 'calc(100% - 92px)',
        },
        maxHeight: {
          // zero: isMakeProposalButtonVisible ? 'calc(100% - 152px)' : 'calc(100% - 75px)',
          sm: 'calc(100% - 75px)',
          md: 'calc(100% - 92px)',
        },
      }}
    >
      <div ref={bottomRef} style={{ height: '8px' }} />
      {room?.allMessages?.edges?.map((edge, index: number) => {
        const isOwnMessage = currentProfile?.id === edge?.node?.profile?.id

        if (!edge?.node) return null

        if (isFirstMessageFromOtherParticipant(index)) {
          return (
            <Box display="flex" flexDirection="column" key={edge?.node?.id}>
              {index === allMessagesLastIndex && (
                // <SentinelLoader isLoadingNext={isLoadingNext} ref={sentinelRef} />
                <div>{isLoadingNext && 'loading'}</div>
              )}
              {showDayOnTopOfGroupedMessages(index)}
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box paddingRight="12px">
                  {/* <Avatar participant={participant} width={32} height={32} /> */}
                  avatar here
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <MessageItem messageRef={edge?.node} profileId={profileId} />
                  {showLastMessageTime(index)}
                </Box>
              </Box>
            </Box>
          )
        }

        return (
          <Box display="flex" flexDirection="column" key={edge?.node?.id}>
            {index === allMessagesLastIndex && (
              // <SentinelLoader isLoadingNext={isLoadingNext} ref={sentinelRef} />
              <div>{isLoadingNext && 'loading'}</div>
            )}
            {showDayOnTopOfGroupedMessages(index)}
            <Box
              sx={{
                display: 'flex',
                ml: 5.5,
                alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <MessageItem messageRef={edge?.node} profileId={profileId} />
                {showLastMessageTime(index, isOwnMessage)}
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default MessagesList
