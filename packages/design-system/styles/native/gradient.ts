import { error, info, primary, secondary, success, warning } from './palette'
import { GradientColors } from './types'

export const primaryGradient: GradientColors = {
  main: `linear-gradient(135deg, ${primary.light} 0%, ${primary.main} 100%)`,
  bold: `linear-gradient(135deg, ${primary.main} 0%, ${primary.dark} 100%)`,
}

export const secondaryGradient: GradientColors = {
  main: `linear-gradient(135deg, ${secondary.light} 0%, ${secondary.main} 100%)`,
  bold: `linear-gradient(135deg, ${secondary.main} 0%, ${secondary.dark} 100%)`,
}

export const infoGradient: GradientColors = {
  main: `linear-gradient(135deg, ${info.light} 0%, ${info.main} 100%)`,
  bold: `linear-gradient(135deg, ${info.main} 0%, ${info.dark} 100%)`,
}

export const successGradient: GradientColors = {
  main: `linear-gradient(135deg, ${success.light} 0%, ${success.main} 100%)`,
  bold: `linear-gradient(135deg, ${success.main} 0%, ${success.dark} 100%)`,
}

export const warningGradient: GradientColors = {
  main: `linear-gradient(135deg, ${warning.light} 0%, ${warning.main} 100%)`,
  bold: `linear-gradient(135deg, ${warning.main} 0%, ${warning.dark} 100%)`,
}

export const errorGradient: GradientColors = {
  main: `linear-gradient(135deg, ${error.light} 0%, ${error.main} 100%)`,
  bold: `linear-gradient(135deg, ${error.main} 0%, ${error.dark} 100%)`,
}

export const gradient = {
  primary: primaryGradient,
  secondary: secondaryGradient,
  info: infoGradient,
  success: successGradient,
  warning: warningGradient,
  error: errorGradient,
}
