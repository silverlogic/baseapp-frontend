'use client'

import { alpha } from '@mui/material/styles'

import { grey } from './palette'
import { ColorScheme, PresetType } from './types'

export const cyan = {
  lighter: '#CCF4FE',
  light: '#68CDF9',
  main: '#078DEE',
  dark: '#0351AB',
  darker: '#012972',
  contrastText: '#FFFFFF',
}

export const purple = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7635dc',
  dark: '#431A9E',
  darker: '#200A69',
  contrastText: '#FFFFFF',
}

export const blue = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#FFFFFF',
}

export const orange = {
  lighter: '#FEF4D4',
  light: '#FED680',
  main: '#fda92d',
  dark: '#B66816',
  darker: '#793908',
  contrastText: grey[800],
}

export const red = {
  lighter: '#FFE3D5',
  light: '#FFC1AC',
  main: '#FF3030',
  dark: '#B71833',
  darker: '#7A0930',
  contrastText: '#FFFFFF',
}

export const yellow = {
  lighter: '#FFF6D6',
  light: '#FFDD84',
  main: '#FFB933',
  dark: '#B77619',
  darker: '#7A4309',
  contrastText: '#212B36',
}

export const green = {
  lighter: '#EDFCD4;',
  light: '#B9F07E',
  main: '#6CCE2B',
  dark: '#399415',
  darker: '#176208',
  contrastText: '#FFFFFF',
}

export const getPresetOptions = (primary: ColorScheme): Record<PresetType, ColorScheme> => ({
  default: primary,
  cyan,
  purple,
  blue,
  orange,
  red,
  green,
  yellow,
})

export const createPresets = (primary: ColorScheme, preset: PresetType) => {
  const colorOptions: Record<PresetType, ColorScheme> = getPresetOptions(primary)
  const primaryColor = colorOptions[preset]

  const theme = {
    palette: {
      primary: primaryColor,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(`${primaryColor?.main}`, 0.24)}`,
    },
  }

  return theme
}
