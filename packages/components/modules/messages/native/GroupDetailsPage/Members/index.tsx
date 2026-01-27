import { FC } from 'react'

import { Button, FabButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

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
  currentProfileIsAdmin = false,
  groupId,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

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
          // TODO: implement add member functionality
          onPress={() => {}}
          iconName="add"
          iconSize={28}
          iconColor={theme.colors.primary.contrast}
          style={styles.addMemberButton}
        />
        <Text variant="subtitle2" color="high">
          Add Member
        </Text>
      </View>
      <View>
        {(members?.edges ?? []).map((edge, index) => {
          if (!edge?.node) return null

          return (
            <MemberItem
              key={edge.node.id ?? `member-edge-${index}`}
              groupMember={edge.node}
              memberIsAdmin={edge.node.role === CHAT_ROOM_PARTICIPANT_ROLES.admin}
              currentProfileIsAdmin={currentProfileIsAdmin}
              groupId={groupId}
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
