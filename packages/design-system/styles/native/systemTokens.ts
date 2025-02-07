import { dark, error, info, light, primary, secondary, success, warning, white } from './palette'
import { transparent } from './transparent'
import { ColorToken, ObjectToken, SurfaceToken } from './types'

const objectLight: ObjectToken = {
  high: light[900],
  low: light[600],
  disabled: light[500],
  contrast: white.main,
}

const objectDark: ObjectToken = {
  high: white.main,
  low: dark[800],
  disabled: dark[600],
  contrast: dark[100],
}

const surfaceLight: SurfaceToken = {
  background: white.main,
  default: white.main,
  active: transparent.light[12],
  disabled: transparent.light[24],
  border: light[400],
}

const surfaceDark: SurfaceToken = {
  background: dark[100],
  default: dark[200],
  active: transparent.dark[24],
  disabled: transparent.dark[32],
  border: dark[400],
}

const primaryColorLight: ColorToken = {
  high: primary.dark,
  main: primary.main,
  low: transparent.primary[48],
  overlay: transparent.primary[12],
  contrast: white.main,
}

const primaryColorDark: ColorToken = {
  high: primary.light,
  main: primary.main,
  low: transparent.primary[48],
  overlay: transparent.primary[16],
  contrast: white.main,
}

const secondaryColorLight: ColorToken = {
  high: secondary.dark,
  main: secondary.main,
  low: transparent.secondary[48],
  overlay: transparent.secondary[12],
  contrast: white.main,
}

const secondaryColorDark: ColorToken = {
  high: secondary.light,
  main: secondary.main,
  low: transparent.secondary[48],
  overlay: transparent.secondary[12],
  contrast: white.main,
}

const infoColorLight: ColorToken = {
  high: info.dark,
  main: info.main,
  low: transparent.info[48],
  overlay: transparent.info[12],
  contrast: white.main,
}

const infoColorDark: ColorToken = {
  high: info.light,
  main: info.main,
  low: transparent.info[48],
  overlay: transparent.info[12],
  contrast: white.main,
}

const successColorLight: ColorToken = {
  high: success.dark,
  main: success.main,
  low: transparent.success[48],
  overlay: transparent.success[12],
  contrast: white.main,
}

const successColorDark: ColorToken = {
  high: success.light,
  main: success.main,
  low: transparent.success[48],
  overlay: transparent.success[12],
  contrast: white.main,
}

const warningColorLight: ColorToken = {
  high: warning.dark,
  main: warning.main,
  low: transparent.warning[48],
  overlay: transparent.warning[12],
  contrast: white.main,
}

const warningColorDark: ColorToken = {
  high: warning.light,
  main: warning.main,
  low: transparent.warning[48],
  overlay: transparent.warning[12],
  contrast: white.main,
}

const errorColorLight: ColorToken = {
  high: error.dark,
  main: error.main,
  low: transparent.error[48],
  overlay: transparent.error[12],
  contrast: white.main,
}

const errorColorDark: ColorToken = {
  high: error.light,
  main: error.main,
  low: transparent.error[48],
  overlay: transparent.error[12],
  contrast: white.main,
}

export const systemTokens = {
  object: {
    light: objectLight,
    dark: objectDark,
  },
  surface: {
    light: surfaceLight,
    dark: surfaceDark,
  },
  primary: {
    light: primaryColorLight,
    dark: primaryColorDark,
  },
  secondary: {
    light: secondaryColorLight,
    dark: secondaryColorDark,
  },
  info: {
    light: infoColorLight,
    dark: infoColorDark,
  },
  success: {
    light: successColorLight,
    dark: successColorDark,
  },
  warning: {
    light: warningColorLight,
    dark: warningColorDark,
  },
  error: {
    light: errorColorLight,
    dark: errorColorDark,
  },
}
