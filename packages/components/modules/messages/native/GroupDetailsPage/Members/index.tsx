import { FC } from 'react'

import { Button, FabButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'

import { CHAT_ROOM_PARTICIPANT_ROLES } from '../../../common'
import MemberItem from './MemberItem'
import { createStyles } from './styles'
import { MembersProps } from './type'

const Members: FC<MembersProps> = ({
  participantsCount,
  members,
  isLoadingNext,
  hasNext,
  loadNext,
  roomId,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const router = useRouter()
  return (
    <View style={styles.membersContainer}>
      <View style={styles.membersTextContainer}>
        <Text variant="subtitle2" color="high">
          Members
        </Text>
        <Text variant="body2" color="low">
          {participantsCount ?? 0}
        </Text>
      </View>
      <View style={styles.addMemberContainer}>
        <FabButton
          onPress={() => {
            router.push(`/edit-group-details/${roomId}/add-members`)
          }}
          iconName="add"
          iconSize={28}
          iconColor={theme.colors.primary.contrast}
          style={styles.addMemberButton}
        />
        <Text
          variant="subtitle2"
          color="high"
          onPress={() => {
            router.push(`/edit-group-details/${roomId}/add-members`)
          }}
        >
          Add Member
        </Text>
      </View>
      <View>
        {(members?.edges ?? []).map((edge, index) => {
          if (!edge?.node) return null

          return (
            <MemberItem
              key={edge.node.id ?? `member-edge-${index}`}
              profileRef={edge.node.profile}
              isAdmin={edge.node.role === CHAT_ROOM_PARTICIPANT_ROLES.admin}
            />
          )
        })}
        {isLoadingNext ? (
          <LoadingScreen size="small" />
        ) : (
          hasNext && (
            <Button mode="text" size="medium" onPress={loadNext}>
              Load More
            </Button>
          )
        )}
      </View>
    </View>
  )
}

export default Members
