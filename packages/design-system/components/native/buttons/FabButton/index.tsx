import { FC } from 'react'

import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

import { createStyles } from './styles'
import type { FabButtonProps } from './types'

const FabButton: FC<FabButtonProps> = ({
  iconName,
  iconSize = 28,
  iconColor,
  style,
  ...touchableProps
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const finalIconColor = iconColor ?? theme.colors?.primary?.contrast ?? '#fff'
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      style={[styles.button, style]}
      {...touchableProps}
    >
      <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
    </TouchableOpacity>
  )
}

export default FabButton
