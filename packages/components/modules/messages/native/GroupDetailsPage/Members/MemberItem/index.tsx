import { FC, useRef } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { useNotification } from '@baseapp-frontend/utils'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import { formatHandle } from '../../../../../__shared__/common'
import { ProfileItemFragment } from '../../../../../profiles/common'
import { ADMIN_LABEL, CHAT_ROOM_PARTICIPANT_ROLES } from '../../../../common'
import { useChatRoomToggleAdminMutation } from '../../../../common/graphql/mutations/ChatRoomToggleAdmin'
import MemberOptions from '../MemberOptions'
import { createStyles } from './styles'
import { MemberItemProps } from './type'

const MemberItem: FC<MemberItemProps> = ({
  groupMember,
  groupId,
  memberIsAdmin = false,
  currentProfileIsAdmin = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const { currentProfile } = useCurrentProfile()

  const profile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, groupMember.profile!)

  const isMe = currentProfile?.id === profile.id

  const path = profile?.urlPath?.path

  const onChatCardLongPress = () => {
    bottomDrawerRef.current?.present()
  }

  const { sendToast } = useNotification()
  const [commitToggleAdmin, isMutationInFlight] = useChatRoomToggleAdminMutation()

  const handleToggleAdminClicked = () => {
    if (isMutationInFlight || !groupId || !currentProfile?.id) return
    bottomDrawerRef.current?.close()

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
              role: memberIsAdmin
                ? CHAT_ROOM_PARTICIPANT_ROLES.member
                : CHAT_ROOM_PARTICIPANT_ROLES.admin,
            },
          },
          errors: null,
        },
      },
      onCompleted: () => {
        bottomDrawerRef.current?.close()
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
      },
    })
  }

  return (
    <Pressable onLongPress={onChatCardLongPress} style={styles.memberItemContainer}>
      <View>
        <AvatarWithPlaceholder imgSource={profile?.image?.url} size={48} />
      </View>
      <View>
        <Text variant="subtitle2" color="high">
          {profile?.name}
        </Text>
        <View style={styles.pathContainer}>
          {path && (
            <Text variant="caption" color="low">
              {formatHandle(path)}
            </Text>
          )}
          {path && memberIsAdmin && (
            <>
              <View style={styles.dotElement} />
              <Text variant="caption" style={{ color: theme.colors.primary.main }}>
                {ADMIN_LABEL}
              </Text>
            </>
          )}
        </View>
      </View>
      <MemberOptions
        bottomDrawerRef={bottomDrawerRef}
        memberIsAdmin={memberIsAdmin}
        currentProfileIsAdmin={currentProfileIsAdmin}
        handleSheetChanges={() => {}}
        handleAdminToggle={handleToggleAdminClicked}
        handleGoToProfile={() => {}}
        handleRemoveMember={() => {}}
        isMe={isMe}
      />
    </Pressable>
  )
}

export default MemberItem
