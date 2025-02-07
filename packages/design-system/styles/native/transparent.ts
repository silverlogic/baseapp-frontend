import color from 'color'

import {
  black,
  dark,
  error,
  info,
  light,
  primary,
  secondary,
  success,
  warning,
  white,
} from './palette'
import { TransparentColors } from './types'

export const primaryTransparent: TransparentColors = {
  8: color(primary.main).alpha(0.08).rgb().string(),
  12: color(primary.main).alpha(0.12).rgb().string(),
  16: color(primary.main).alpha(0.16).rgb().string(),
  20: color(primary.main).alpha(0.2).rgb().string(),
  24: color(primary.main).alpha(0.24).rgb().string(),
  32: color(primary.main).alpha(0.32).rgb().string(),
  48: color(primary.main).alpha(0.48).rgb().string(),
}

export const secondaryTransparent: TransparentColors = {
  8: color(secondary.main).alpha(0.08).rgb().string(),
  12: color(secondary.main).alpha(0.12).rgb().string(),
  16: color(secondary.main).alpha(0.16).rgb().string(),
  20: color(secondary.main).alpha(0.2).rgb().string(),
  24: color(secondary.main).alpha(0.24).rgb().string(),
  32: color(secondary.main).alpha(0.32).rgb().string(),
  48: color(secondary.main).alpha(0.48).rgb().string(),
}

export const infoTransparent: TransparentColors = {
  8: color(info.main).alpha(0.08).rgb().string(),
  12: color(info.main).alpha(0.12).rgb().string(),
  16: color(info.main).alpha(0.16).rgb().string(),
  20: color(info.main).alpha(0.2).rgb().string(),
  24: color(info.main).alpha(0.24).rgb().string(),
  32: color(info.main).alpha(0.32).rgb().string(),
  48: color(info.main).alpha(0.48).rgb().string(),
}

export const successTransparent: TransparentColors = {
  8: color(success.main).alpha(0.08).rgb().string(),
  12: color(success.main).alpha(0.12).rgb().string(),
  16: color(success.main).alpha(0.16).rgb().string(),
  20: color(success.main).alpha(0.2).rgb().string(),
  24: color(success.main).alpha(0.24).rgb().string(),
  32: color(success.main).alpha(0.32).rgb().string(),
  48: color(success.main).alpha(0.48).rgb().string(),
}

export const warningTransparent: TransparentColors = {
  8: color(warning.main).alpha(0.08).rgb().string(),
  12: color(warning.main).alpha(0.12).rgb().string(),
  16: color(warning.main).alpha(0.16).rgb().string(),
  20: color(warning.main).alpha(0.2).rgb().string(),
  24: color(warning.main).alpha(0.24).rgb().string(),
  32: color(warning.main).alpha(0.32).rgb().string(),
  48: color(warning.main).alpha(0.48).rgb().string(),
}

export const errorTransparent: TransparentColors = {
  8: color(error.main).alpha(0.08).rgb().string(),
  12: color(error.main).alpha(0.12).rgb().string(),
  16: color(error.main).alpha(0.16).rgb().string(),
  20: color(error.main).alpha(0.2).rgb().string(),
  24: color(error.main).alpha(0.24).rgb().string(),
  32: color(error.main).alpha(0.32).rgb().string(),
  48: color(error.main).alpha(0.48).rgb().string(),
}

export const lightTransparent: TransparentColors = {
  8: color(light[500]).alpha(0.08).rgb().string(),
  12: color(light[500]).alpha(0.12).rgb().string(),
  16: color(light[500]).alpha(0.16).rgb().string(),
  20: color(light[500]).alpha(0.2).rgb().string(),
  24: color(light[500]).alpha(0.24).rgb().string(),
  32: color(light[500]).alpha(0.32).rgb().string(),
  48: color(light[500]).alpha(0.48).rgb().string(),
  56: color(light[500]).alpha(0.56).rgb().string(),
  64: color(light[500]).alpha(0.64).rgb().string(),
  72: color(light[500]).alpha(0.72).rgb().string(),
  80: color(light[500]).alpha(0.8).rgb().string(),
}

export const darkTransparent: TransparentColors = {
  8: color(dark[500]).alpha(0.08).rgb().string(),
  12: color(dark[500]).alpha(0.12).rgb().string(),
  16: color(dark[500]).alpha(0.16).rgb().string(),
  20: color(dark[500]).alpha(0.2).rgb().string(),
  24: color(dark[500]).alpha(0.24).rgb().string(),
  32: color(dark[500]).alpha(0.32).rgb().string(),
  48: color(dark[500]).alpha(0.48).rgb().string(),
  56: color(dark[500]).alpha(0.56).rgb().string(),
  64: color(dark[500]).alpha(0.64).rgb().string(),
  72: color(dark[500]).alpha(0.72).rgb().string(),
  80: color(dark[500]).alpha(0.8).rgb().string(),
}

export const blackTransparent: TransparentColors = {
  8: color(black.main).alpha(0.08).rgb().string(),
  12: color(black.main).alpha(0.12).rgb().string(),
  16: color(black.main).alpha(0.16).rgb().string(),
  20: color(black.main).alpha(0.2).rgb().string(),
  24: color(black.main).alpha(0.24).rgb().string(),
  32: color(black.main).alpha(0.32).rgb().string(),
  48: color(black.main).alpha(0.48).rgb().string(),
  56: color(black.main).alpha(0.56).rgb().string(),
  64: color(black.main).alpha(0.64).rgb().string(),
  72: color(black.main).alpha(0.72).rgb().string(),
  80: color(black.main).alpha(0.8).rgb().string(),
}

export const whiteTransparent: TransparentColors = {
  8: color(white.main).alpha(0.08).rgb().string(),
  12: color(white.main).alpha(0.12).rgb().string(),
  16: color(white.main).alpha(0.16).rgb().string(),
  20: color(white.main).alpha(0.2).rgb().string(),
  24: color(white.main).alpha(0.24).rgb().string(),
  32: color(white.main).alpha(0.32).rgb().string(),
  48: color(white.main).alpha(0.48).rgb().string(),
  56: color(white.main).alpha(0.56).rgb().string(),
  64: color(white.main).alpha(0.64).rgb().string(),
  72: color(white.main).alpha(0.72).rgb().string(),
  80: color(white.main).alpha(0.8).rgb().string(),
}

export const transparent = {
  primary: primaryTransparent,
  secondary: secondaryTransparent,
  info: infoTransparent,
  success: successTransparent,
  warning: warningTransparent,
  error: errorTransparent,
  light: lightTransparent,
  dark: darkTransparent,
  black: blackTransparent,
  white: whiteTransparent,
}
