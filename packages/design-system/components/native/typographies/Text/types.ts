import { ComponentProps } from 'react'

import { Text as PaperText } from 'react-native-paper'

import { FontVariants, SystemTokens } from '../../../../styles/native'

export type TextColorVariant = keyof SystemTokens['object']

type PaperTextProps = Omit<ComponentProps<typeof PaperText>, 'variant'>

export type TextStylesOptions = { variant: FontVariants; color: TextColorVariant }

export type TextProps = PaperTextProps & { variant?: FontVariants; color?: TextColorVariant }
