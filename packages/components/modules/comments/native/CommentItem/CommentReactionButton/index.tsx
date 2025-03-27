import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import {
  FavoriteIcon,
  FavoriteSelectedIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { ReactionButton } from '../../../../__shared__/common'
import { createStyles } from './styles'
import { CommentReactionButtonProps } from './types'

const CommentReactionButton: FC<CommentReactionButtonProps> = ({ target: targetRef }) => {
  const styles = createStyles()
  return (
    <ReactionButton target={targetRef} reactionType="LIKE">
      {({ handleReaction, target }) => (
        <View style={styles.reactionContainer}>
          <IconButton onPress={handleReaction} style={{ paddingHorizontal: 0, paddingVertical: 5 }}>
            {target?.myReaction?.id ? <FavoriteSelectedIcon /> : <FavoriteIcon />}
          </IconButton>
          <Text variant="caption" color="low">
            {target?.reactionsCount?.total}
          </Text>
        </View>
      )}
    </ReactionButton>
  )
}

export default CommentReactionButton
