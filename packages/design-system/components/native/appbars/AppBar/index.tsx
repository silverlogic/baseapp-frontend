import { FC } from 'react'

import { Pressable } from 'react-native'

import { useTheme } from '../../../../providers/native'
import { IconButton } from '../../buttons'
import { ChevronIcon as DefaultBackIcon, CloseIcon as DefaultCloseIcon } from '../../icons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { createStyles } from './styles'
import { AppBarProps } from './types'

const AppBar: FC<AppBarProps> = ({
  title,
  titleComponent,
  onBack,
  closeLabel,
  closeDisabled,
  onClose,
  BackIcon = DefaultBackIcon,
  CloseIcon = DefaultCloseIcon,
  closeComponent,
  CloseIconProps,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
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
      <View style={styles.closeButtonContainer}>
        {closeComponent ||
          (onClose && (
            <Pressable
              disabled={closeDisabled}
              accessibilityRole="button"
              accessibilityLabel={closeLabel || 'Close'}
              accessibilityHint="Close the current screen"
              onPress={onClose}
            >
              <View style={styles.closeButtonContent}>
                {closeLabel && (
                  <Text
                    variant="subtitle2"
                    color={closeDisabled ? 'disabled' : 'high'}
                    style={{ fontWeight: '500' }}
                  >
                    {closeLabel}
                  </Text>
                )}
                <CloseIcon
                  color={closeDisabled ? theme.colors.surface.disabled : theme.colors.primary.high}
                  {...CloseIconProps}
                />
              </View>
            </Pressable>
          ))}
      </View>
    </View>
  )
}

export default AppBar
