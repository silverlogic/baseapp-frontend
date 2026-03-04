import { FC, useMemo } from 'react'

import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { MemberOptionsProps } from './type'

const MemberOptions: FC<MemberOptionsProps> = ({
  bottomDrawerRef,
  handleSheetChanges,
  handleAdminToggle,
  handleGoToProfile,
  handleRemoveMember,
  memberIsAdmin = false,
  currentProfileIsAdmin = false,
  isMe = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  return (
    <BottomDrawer
      bottomDrawerRef={bottomDrawerRef}
      handleSheetChanges={handleSheetChanges}
      snapPoints={snapPoints}
    >
      <View style={styles.modalContent}>
        <Pressable onPress={handleGoToProfile} style={styles.modalItem}>
          <Text variant="body2" color="high">
            See Profile
          </Text>
        </Pressable>
        {currentProfileIsAdmin && !isMe && (
          <Pressable onPress={handleAdminToggle} style={styles.modalItem}>
            <Text variant="body2" color="high">
              {memberIsAdmin ? 'Remove admin permissions' : 'Promote to admin'}
            </Text>
          </Pressable>
        )}
      </View>
      {(currentProfileIsAdmin || isMe) && (
        <View style={[styles.modalContent, { borderBottomWidth: 0 }]}>
          <Pressable onPress={handleRemoveMember} style={styles.modalItem}>
            <Text variant="body2" style={{ color: theme.colors.error.main }}>
              {isMe ? 'Leave Group' : 'Remove from group'}
            </Text>
          </Pressable>
        </View>
      )}
    </BottomDrawer>
  )
}

export default MemberOptions
