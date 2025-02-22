import { FC } from 'react'

import { useTheme } from '../../../../providers/native'
import { IconButton } from '../../buttons'
import { ChevronIcon as DefaultBackIcon, CloseIcon as DefaultCloseIcon } from '../../icons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { createStyles } from './styles'
import { AppBarProps } from './types'

const AppBar: FC<AppBarProps> = ({
  title,
  onBack,
  onClose,
  BackIcon = DefaultBackIcon,
  CloseIcon = DefaultCloseIcon,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {onBack && (
          <IconButton onPress={onBack}>
            <BackIcon />
          </IconButton>
        )}
      </View>
      <Text variant="subtitle2" style={styles.title}>
        {title}
      </Text>
      <View style={styles.buttonContainer}>
        {onClose && (
          <IconButton onPress={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </View>
    </View>
  )
}

export default AppBar
