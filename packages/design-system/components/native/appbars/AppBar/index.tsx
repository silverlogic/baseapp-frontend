import { FC } from 'react'

import { Pressable } from 'react-native'

import { useTheme } from '../../../../providers/native'
import { IconButton } from '../../buttons'
import {
  ChevronIcon,
  ChevronIcon as DefaultBackIcon,
  CloseIcon as DefaultCloseIcon,
} from '../../icons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { createStyles } from './styles'
import { AppBarProps } from './types'

const AppBar: FC<AppBarProps> = ({
  title,
  titleComponent,
  onBack,
  onNext,
  nextLabel,
  nextIcon,
  onClose,
  BackIcon = DefaultBackIcon,
  CloseIcon = DefaultCloseIcon,
  closeComponent,
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
      {titleComponent || (
        <Text variant="subtitle2" style={styles.title}>
          {title}
        </Text>
      )}
      {onNext && (
        <Pressable onPress={onNext}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {nextLabel && (
              <Text variant="subtitle2" color="high" style={{ fontWeight: '500' }}>
                {nextLabel}
              </Text>
            )}
            {nextIcon || <ChevronIcon direction="right" color="high" />}
          </View>
        </Pressable>
      )}
      {closeComponent ||
        (onClose && (
          <View style={styles.buttonContainer}>
            <IconButton onPress={onClose}>
              <CloseIcon />
            </IconButton>
          </View>
        ))}
    </View>
  )
}

export default AppBar
