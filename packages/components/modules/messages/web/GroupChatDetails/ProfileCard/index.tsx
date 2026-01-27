'use client'

import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { ThreeDotsIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, IconButton, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { formatHandle } from '../../../../__shared__/common/utils'
import { ProfileItemFragment } from '../../../../profiles/common'
import { ADMIN_LABEL, CHAT_ROOM_PARTICIPANT_ROLES } from '../../../common'
import { useChatRoomToggleAdminMutation } from '../../../common/graphql/mutations/ChatRoomToggleAdmin'
import AdminOptionsMenu from './AdminOptionsMenu'
import MemberOptionsMenu from './MemberOptionsMenu'
import { MainContainer } from './styled'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({
  hasAdminPermissions,
  groupMember,
  initiateRemoval,
  groupId,
}) => {
  const { id, image, name, urlPath } = useFragment<ProfileItemFragment$key>(
    ProfileItemFragment,
    groupMember.profile!,
  )
  const showUrlPath = !!urlPath?.path
  const isAdmin = groupMember.role === CHAT_ROOM_PARTICIPANT_ROLES.admin
  const showMenu = hasAdminPermissions
  const { currentProfile } = useCurrentProfile()
  const popover = usePopover()
  const isMe = currentProfile?.id === id

  const handleRemoveClicked = () => {
    popover.onClose()
    initiateRemoval(groupMember.profile!)
  }

  const { sendToast } = useNotification()
  const [commitToggleAdmin, isMutationInFlight] = useChatRoomToggleAdminMutation()

  const handleToggleAdminClicked = () => {
    if (isMutationInFlight || !groupId || !currentProfile?.id) return
    popover.onClose()

    commitToggleAdmin({
      variables: {
        input: {
          roomId: groupId,
          profileId: currentProfile.id,
          targetParticipantId: groupMember.id,
        },
      },
      optimisticResponse: {
        chatRoomToggleAdmin: {
          participant: {
            node: {
              id: groupMember.id,
              role: isAdmin
                ? CHAT_ROOM_PARTICIPANT_ROLES.member
                : CHAT_ROOM_PARTICIPANT_ROLES.admin,
            },
          },
          errors: null,
        },
      },
      onCompleted: () => {
        popover.onClose()
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
    })
  }

  const renderMenuItems = () => {
    if (isMe) {
      return (
        <MemberOptionsMenu
          isMe={isMe}
          onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
          onRemoveClicked={handleRemoveClicked}
        />
      )
    }

    if (!isMe && hasAdminPermissions) {
      return (
        <AdminOptionsMenu
          onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
          onToggleAdminClicked={handleToggleAdminClicked}
          onRemoveClicked={handleRemoveClicked}
          isAdmin={isAdmin}
        />
      )
    }

    return (
      <MemberOptionsMenu
        isMe={isMe}
        onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
        onRemoveClicked={handleRemoveClicked}
      />
    )
  }

  return (
    <MainContainer key={`profile-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: 'min-content min-content min-content',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {showUrlPath && formatHandle(urlPath.path)}
          </Typography>
          {isAdmin && showUrlPath && (
            <Box
              sx={{
                display: 'inline-block',
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                backgroundColor: 'text.disabled',
                marginX: '8px',
              }}
            />
          )}
          <Typography variant="caption" color="primary.light">
            {isAdmin && ADMIN_LABEL}
          </Typography>
        </Box>
      </Box>
      {showMenu ? (
        <Box>
          <IconButton onClick={popover.onOpen} aria-label="Show admin options">
            <ThreeDotsIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <Popover open={popover.open} onClose={popover.onClose}>
            {renderMenuItems()}
          </Popover>
        </Box>
      ) : (
        <Box />
      )}
    </MainContainer>
  )
}

export default ProfileCard
