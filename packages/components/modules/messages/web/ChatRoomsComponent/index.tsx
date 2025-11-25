'use client'

import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { useQueryLoader } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { GroupDetailsQuery, useChatRoom } from '../../common'
import { LEFT_PANEL_CONTENT } from '../../common/context/useChatRoom/constants'
import DefaultAllChatRoomsList from '../AllChatRoomsList'
import ChatRoom from '../ChatRoom'
import DefaultGroupChatCreate from '../GroupChatCreate'
import DefaultGroupChatDetails from '../GroupChatDetails'
import DefaultGroupChatEdit from '../GroupChatEdit'
import DefaultProfileSummary from '../ProfileSummary'
import DefaultSingleChatCreate from '../SingleChatCreate'
import { ChatRoomContainer, ChatRoomsContainer, ChatRoomsListContainer } from './styled'
import { ChatRoomsComponentProps } from './types'

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
  ProfileSummaryComponent = DefaultProfileSummary,
}) => {
  const isUpToMd = useResponsive('up', 'md')

  const [groupDetailsQueryRef, loadGroupDetailsQuery] =
    useQueryLoader<GroupDetailsQueryType>(GroupDetailsQuery)

  const { id: selectedRoom, leftPanelContent, setLeftPanelContent } = useChatRoom()

  const displayGroupDetails = () => {
    if (selectedRoom) {
      setLeftPanelContent(LEFT_PANEL_CONTENT.groupDetails)
      loadGroupDetailsQuery({ roomId: selectedRoom }, { fetchPolicy: 'network-only' })
    }
  }

  const displayProfileSummary = () => {
    if (selectedRoom) {
      setLeftPanelContent(LEFT_PANEL_CONTENT.profileSummary)
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
            roomId={selectedRoom}
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
      case LEFT_PANEL_CONTENT.profileSummary:
        if (!groupDetailsQueryRef) return null
        return (
          <ProfileSummaryComponent
            queryRef={groupDetailsQueryRef}
            onBackButtonClicked={() => setLeftPanelContent(LEFT_PANEL_CONTENT.chatRoomList)}
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

    return (
      <ChatRoom
        roomId={selectedRoom}
        onDisplayGroupDetailsClicked={displayGroupDetails}
        onDisplayProfileSummaryClicked={displayProfileSummary}
      />
    )
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
