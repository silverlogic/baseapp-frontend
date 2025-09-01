import { FC } from 'react'

import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

import { createStyles } from './styles'
import { FabButtonProps } from './types'

const FabButton: FC<FabButtonProps> = ({
  iconName,
  iconSize = 28,
  iconColor = '#000',
  style,
  ...touchableProps
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <TouchableOpacity style={[styles.button, style]} {...touchableProps}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  )
}

export default FabButton
