import { StyleSheet, ViewStyle } from 'react-native'

import { Theme } from '../../../../styles/native'
import { OutlinedStylesOptions } from './types'

export const baseInputStyles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
  },
  content: {},
  text: {},
})

const getOutlinedWrapperStyles = ({ colors }: Theme, options: OutlinedStylesOptions): ViewStyle => {
  const { isFocused, isError, isDisabled } = options

  if (isDisabled) {
    return {
      borderColor: colors.surface.disabled,
      borderStyle: 'dashed',
    }
  }
  if (isError && isFocused) {
    return {
      borderColor: colors.error.main,
      borderStyle: 'solid',
    }
  }
  if (isFocused) {
    return {
      borderColor: colors.object.high,
      borderStyle: 'solid',
    }
  }

  return {
    borderColor: colors.surface.border,
    borderStyle: 'solid',
  }
}

export const createOutlinedStyles = (theme: Theme, options: OutlinedStylesOptions) =>
  StyleSheet.create({
    ...baseInputStyles,
    wrapper: {
      ...baseInputStyles.wrapper,
      ...getOutlinedWrapperStyles(theme, options),
    },
  })

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingLeft: 12,
  },
})
