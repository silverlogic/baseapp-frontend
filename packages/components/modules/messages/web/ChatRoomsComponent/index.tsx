'use client'

import { FC, useState } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { useQueryLoader } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { GroupDetailsQuery, useChatRoom } from '../../common'
import DefaultAllChatRoomsList from '../AllChatRoomsList'
import ChatRoom from '../ChatRoom'
import DefaultGroupChatRoomCreate from '../GroupChatRoomCreate'
import DefaultGroupChatRoomDetails from '../GroupChatRoomDetail'
import DefaultGroupChatRoomEdit from '../GroupChatRoomEdit'
import DefaultSingleChatRoomCreate from '../SingleChatRoomCreate'
import { LEFT_PANEL_CONTENT, LeftPanelContentValues } from './constants'
import { ChatRoomContainer, ChatRoomsContainer, ChatRoomsListContainer } from './styled'
import { ChatRoomsComponentProps } from './types'

const ChatRoomsComponent: FC<ChatRoomsComponentProps> = ({
  chatRoomsQueryData,
  settings,
  AllChatRoomsListComponent = DefaultAllChatRoomsList,
  AllChatRoomsListComponentProps = {},
  GroupChatRoomCreateComponent = DefaultGroupChatRoomCreate,
  GroupChatRoomCreateComponentProps = {},
  GroupChatRoomDetailsComponent = DefaultGroupChatRoomDetails,
  GroupChatRoomDetailsComponentProps = {},
  GroupChatRoomEditComponent = DefaultGroupChatRoomEdit,
  GroupChatRoomEditComponentProps = {},
  SingleChatRoomCreateComponent = DefaultSingleChatRoomCreate,
  SingleChatRoomCreateComponentProps = {},
}) => {
  const isUpToMd = useResponsive('up', 'md')
  const [leftPanelContent, setLeftPanelContent] = useState<LeftPanelContentValues>(
    LEFT_PANEL_CONTENT.chatRoomList,
  )

  const [groupDetailsQueryRef, loadGroupDetailsQuery] =
    useQueryLoader<GroupDetailsQueryType>(GroupDetailsQuery)
  const { id: selectedRoom } = useChatRoom()

  const displayGroupDetails = () => {
    if (selectedRoom) {
      setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)
      loadGroupDetailsQuery({ roomId: selectedRoom }, { fetchPolicy: 'network-only' })
    }
  }

  const shouldRenderLeftPanel =
    isUpToMd || leftPanelContent !== LEFT_PANEL_CONTENT.chatRoomList || !selectedRoom
  const shouldRenderRightPanel =
    isUpToMd || (leftPanelContent === LEFT_PANEL_CONTENT.chatRoomList && !!selectedRoom)

  const renderLeftPanelContent = () => {
    switch (leftPanelContent) {
      case LEFT_PANEL_CONTENT.createGroupChat:
        return (
          <GroupChatRoomCreateComponent
            allProfilesRef={chatRoomsQueryData}
            onValidSubmission={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onBackButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.createChat)}
            {...GroupChatRoomCreateComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.editGroupChat:
        if (!groupDetailsQueryRef) return null
        return (
          <GroupChatRoomEditComponent
            onCancellation={() => setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)}
            onRemovalFromGroup={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onValidSubmission={() => setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)}
            queryRef={groupDetailsQueryRef}
            roomId={selectedRoom}
            allProfilesRef={chatRoomsQueryData}
            {...GroupChatRoomEditComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.groupDetails:
        if (!groupDetailsQueryRef) return null
        return (
          <GroupChatRoomDetailsComponent
            queryRef={groupDetailsQueryRef}
            onBackButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onEditButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.editGroupChat)}
            {...GroupChatRoomDetailsComponentProps}
          />
        )
      case LEFT_PANEL_CONTENT.createChat:
        return (
          <SingleChatRoomCreateComponent
            allProfilesRef={chatRoomsQueryData}
            onHeaderClick={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onChatCreation={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
            onGroupChatCreationButtonClicked={() =>
              setLeftPanelContent(LEFT_PANEL_CONTENT.createGroupChat)
            }
            {...SingleChatRoomCreateComponentProps}
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
    if (!selectedRoom) return <div />

    return <ChatRoom roomId={selectedRoom} onDisplayGroupDetailsClicked={displayGroupDetails} />
  }

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
