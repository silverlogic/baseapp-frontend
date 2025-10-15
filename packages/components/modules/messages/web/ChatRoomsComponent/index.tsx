'use client'

import { FC, useEffect, useState } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { useQueryLoader } from 'react-relay'

import { ChatRoomQuery as ChatRoomQueryType } from '../../../../__generated__/ChatRoomQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { ChatRoomQuery, GroupDetailsQuery, useChatRoom } from '../../common'
import DefaultAllChatRoomsList from '../AllChatRoomsList'
import ChatRoom from '../ChatRoom'
import DefaultGroupChatCreate from '../GroupChatCreate'
import DefaultGroupChatDetails from '../GroupChatDetails'
import DefaultGroupChatEdit from '../GroupChatEdit'
import DefaultSingleChatCreate from '../SingleChatCreate'
import { LEFT_PANEL_CONTENT } from './constants'
import { ChatRoomContainer, ChatRoomsContainer, ChatRoomsListContainer } from './styled'
import { ChatRoomsComponentProps, LeftPanelContentValues } from './types'

const ChatRoomsComponent: FC<ChatRoomsComponentProps> = ({
  chatRoomsQueryData,
  settings,
  AllChatRoomsListComponent = DefaultAllChatRoomsList,
  AllChatRoomsListComponentProps = {},
  GroupChatCreateComponent = DefaultGroupChatCreate,
  GroupChatCreateComponentProps = {},
  GroupChatDetailsComponent = DefaultGroupChatDetails,
  GroupChatDetailsComponentProps = {},
  GroupChatEditComponent = DefaultGroupChatEdit,
  GroupChatEditComponentProps = {},
  SingleChatCreateComponent = DefaultSingleChatCreate,
  SingleChatCreateComponentProps = {},
}) => {
  const isUpToMd = useResponsive('up', 'md')
  const [leftPanelContent, setLeftPanelContent] = useState<LeftPanelContentValues>(
    LEFT_PANEL_CONTENT.chatRoomList,
  )

  const [groupDetailsQueryRef, loadGroupDetailsQuery] =
    useQueryLoader<GroupDetailsQueryType>(GroupDetailsQuery)
  const [chatRoomQueryRef, loadChatRoomQuery] = useQueryLoader<ChatRoomQueryType>(ChatRoomQuery)
  const { id: roomId } = useChatRoom()

  const displayGroupDetails = () => {
    if (roomId) {
      setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)
      loadGroupDetailsQuery({ roomId }, { fetchPolicy: 'network-only' })
    }
  }

  const shouldRenderLeftPanel =
    isUpToMd || leftPanelContent !== LEFT_PANEL_CONTENT.chatRoomList || !roomId
  const shouldRenderRightPanel =
    isUpToMd || (leftPanelContent === LEFT_PANEL_CONTENT.chatRoomList && !!roomId)

  const renderLeftPanelContent = () => {
    switch (leftPanelContent) {
      case LEFT_PANEL_CONTENT.createGroupChat:
        return (
          <GroupChatCreateComponent
            allProfilesRef={chatRoomsQueryData}
            onValidSubmission={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onBackButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.createChat)}
            {...GroupChatCreateComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.editGroupChat:
        if (!groupDetailsQueryRef) return null
        return (
          <GroupChatEditComponent
            onCancellation={() => setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)}
            onRemovalFromGroup={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onValidSubmission={() => setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)}
            queryRef={groupDetailsQueryRef}
            roomId={roomId}
            allProfilesRef={chatRoomsQueryData}
            {...GroupChatEditComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.groupDetails:
        if (!groupDetailsQueryRef) return null
        return (
          <GroupChatDetailsComponent
            queryRef={groupDetailsQueryRef}
            onBackButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onEditButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.editGroupChat)}
            {...GroupChatDetailsComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.createChat:
        return (
          <SingleChatCreateComponent
            allProfilesRef={chatRoomsQueryData}
            onHeaderClick={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onChatCreation={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onGroupChatCreationButtonClicked={() =>
              setLeftPanelContent(LEFT_PANEL_CONTENT.createGroupChat)
            }
            {...SingleChatCreateComponentProps}
          />
        )
      default:
        return (
          <AllChatRoomsListComponent
            targetRef={chatRoomsQueryData}
            onHeaderClick={() => setLeftPanelContent(LEFT_PANEL_CONTENT.createChat)}
            {...AllChatRoomsListComponentProps}
          />
        )
    }
  }

  const renderRightPanelContent = () => {
    if (!chatRoomQueryRef || !roomId) return <div />

    return (
      <ChatRoom
        roomId={roomId}
        roomRef={chatRoomQueryRef}
        onDisplayGroupDetailsClicked={displayGroupDetails}
      />
    )
  }

  useEffect(() => {
    if (roomId) {
      loadChatRoomQuery({ roomId }, { fetchPolicy: 'store-and-network' })
    }
  }, [roomId, loadChatRoomQuery])

  return (
    <ChatRoomsContainer themeLayout={settings.themeLayout}>
      {shouldRenderLeftPanel && (
        <ChatRoomsListContainer hide={!shouldRenderLeftPanel /* TODO: Why? */}>
          {renderLeftPanelContent()}
        </ChatRoomsListContainer>
      )}
      {shouldRenderRightPanel && (
        <ChatRoomContainer hide={!shouldRenderRightPanel /* TODO: Why? */}>
          {renderRightPanelContent()}
        </ChatRoomContainer>
      )}
    </ChatRoomsContainer>
  )
}

export default ChatRoomsComponent
