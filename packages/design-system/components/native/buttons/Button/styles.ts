import { StyleSheet } from 'react-native'

import { Theme, typography } from '../../../../styles/native'
import { ButtonStylesOptions } from './types'

export const baseButtonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    shadowOpacity: 0,
  },
  content: {
    gap: 8,
  },
  text: {
    marginVertical: 0,
    marginHorizontal: 0,
    textTransform: 'none',
    letterSpacing: 0,
  },
})

export const createContainedStyles = (
  { colors }: Theme,
  { disabled, variant }: ButtonStylesOptions,
) => {
  const backgroundColor = variant === 'inherit' ? colors.object.high : colors[variant].main
  const textColor = variant === 'inherit' ? colors.object.contrast : colors[variant].contrast

  return StyleSheet.create({
    ...baseButtonStyles,
    wrapper: {
      ...baseButtonStyles.wrapper,
      backgroundColor: colors.surface.background,
    },
    content: {
      ...baseButtonStyles.content,
      backgroundColor: disabled ? colors.surface.disabled : backgroundColor,
    },
    text: {
      ...baseButtonStyles.text,
      color: disabled ? colors.object.disabled : textColor,
    },
  })
}

export const createTextStyles = ({ colors }: Theme, { disabled, variant }: ButtonStylesOptions) => {
  const textColor = variant === 'inherit' ? colors.object.high : colors[variant].main

  return StyleSheet.create({
    ...baseButtonStyles,
    text: {
      ...baseButtonStyles.text,
      color: disabled ? colors.object.disabled : textColor,
    },
  })
}

export const createOutlinedStyles = (
  { colors }: Theme,
  { disabled, variant }: ButtonStylesOptions,
) => {
  const borderColor = variant === 'inherit' ? colors.surface.border : colors[variant].low
  const textColor = variant === 'inherit' ? colors.object.high : colors[variant].high

  return StyleSheet.create({
    ...baseButtonStyles,
    wrapper: {
      ...baseButtonStyles.wrapper,
      borderColor: disabled ? colors.surface.disabled : borderColor,
    },
    text: {
      ...baseButtonStyles.text,
      color: disabled ? colors.object.disabled : textColor,
    },
  })
}

export const createSoftStyles = ({ colors }: Theme, { disabled, variant }: ButtonStylesOptions) => {
  const backgroundColor = variant === 'inherit' ? colors.surface.active : colors[variant].overlay
  const textColor = variant === 'inherit' ? colors.object.high : colors[variant].high
  // if variant inherit display no shadow to the button
  return StyleSheet.create({
    ...baseButtonStyles,
    wrapper: {
      ...baseButtonStyles.wrapper,
      backgroundColor: colors.surface.background,
    },
    content: {
      ...baseButtonStyles.content,
      backgroundColor: disabled ? colors.surface.disabled : backgroundColor,
    },
    text: {
      ...baseButtonStyles.text,
      color: disabled ? colors.object.disabled : textColor,
    },
  })
}

export const smallSizeStyles = StyleSheet.create({
  content: {
    ...baseButtonStyles.content,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    ...baseButtonStyles.text,
    ...typography.buttonSmall,
  },
})

export const mediumSizeStyles = StyleSheet.create({
  content: {
    ...baseButtonStyles.content,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    ...baseButtonStyles.text,
    ...typography.buttonMedium,
  },
})

export const largeSizeStyles = StyleSheet.create({
  content: {
    ...baseButtonStyles.content,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  text: {
    ...baseButtonStyles.text,
    ...typography.buttonLarge,
  },
})

export const compactStyles = StyleSheet.create({
  content: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
})
