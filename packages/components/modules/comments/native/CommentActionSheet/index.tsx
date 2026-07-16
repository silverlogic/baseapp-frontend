import { FC } from 'react'

import { BottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import {
  EditIcon,
  PinIcon,
  ShareIcon,
  TrashIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'

import { CommentAction, CommentActionId } from '../../common'
import { createStyles } from './styles'
import { CommentActionSheetProps } from './types'

/**
 * Native presentation of the shared `useCommentActions` descriptors: a 30% bottom sheet with
 * the non-destructive actions on top and the destructive ones in a divided section below.
 */
const CommentActionSheet: FC<CommentActionSheetProps> = ({
  actions,
  bottomDrawerRef,
  onActionPress,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const renderIcon = (id: CommentActionId, color: string) => {
    switch (id) {
      case 'share':
        return <ShareIcon width={20} height={20} color={color} />
      case 'pin':
        return <PinIcon width={20} height={20} color={color} />
      case 'edit':
        return <EditIcon width={20} height={20} color={color} />
      case 'delete':
        return <TrashIcon width={20} height={20} color={color} />
      default:
        return null
    }
  }

  const renderAction = (action: CommentAction, color: string, textStyle?: { color: string }) => (
    <Pressable
      key={action.id}
      onPress={() => onActionPress(action)}
      disabled={action.disabled}
      style={styles.pressable}
    >
      {renderIcon(action.id, color)}
      {textStyle ? (
        <Text variant="body2" style={textStyle}>
          {action.label}
        </Text>
      ) : (
        <Text variant="body2" color="high">
          {action.label}
        </Text>
      )}
    </Pressable>
  )

  const mainActions = actions.filter((action) => action.hasPermission && !action.isDestructive)
  const destructiveActions = actions.filter(
    (action) => action.hasPermission && action.isDestructive,
  )

  return (
    <BottomDrawer
      bottomDrawerRef={bottomDrawerRef}
      handleSheetChanges={() => {}}
      snapPoints={['30%']}
    >
      <View style={styles.actionContainer}>
        {mainActions.map((action) => renderAction(action, theme.colors.object.high))}
      </View>
      {destructiveActions.length > 0 && (
        <View style={styles.destructiveContainer}>
          {destructiveActions.map((action) =>
            renderAction(action, theme.colors.error.main, { color: theme.colors.error.main }),
          )}
        </View>
      )}
    </BottomDrawer>
  )
}

export default CommentActionSheet
