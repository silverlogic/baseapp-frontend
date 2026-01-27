import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useFragment } from 'react-relay'

import { formatHandle } from '../../../../../__shared__/common'
import { ProfileItemFragment } from '../../../../../profiles/common'
import { ADMIN_LABEL } from '../../../../common'
import { createStyles } from './styles'
import { MemberItemProps } from './type'

const MemberItem: FC<MemberItemProps> = ({ profileRef, isAdmin }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const profile = useFragment(ProfileItemFragment, profileRef)

  const path = profile?.urlPath?.path

  return (
    <View style={styles.memberItemContainer}>
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
          {path && isAdmin && (
            <>
              <View style={styles.dotElement} />
              <Text variant="caption" style={{ color: theme.colors.primary.main }}>
                {ADMIN_LABEL}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default MemberItem
