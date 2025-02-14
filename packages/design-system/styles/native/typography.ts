import { StyleSheet } from 'react-native'
import { configureFonts } from 'react-native-paper'

import { Typography } from './types'

export const typographyObject: Typography = {
  h1: {
    fontFamily: 'PublicSans_800ExtraBold',
    fontWeight: 800,
    fontSize: 40,
    lineHeight: 50,
  },
  h2: {
    fontFamily: 'PublicSans_800ExtraBold',
    fontWeight: 800,
    fontSize: 32,
    lineHeight: 42,
  },
  h3: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 36,
  },
  h4: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 30,
  },
  h5: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 27,
  },
  h6: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 17,
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: 'PublicSans_600SemiBold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: 'PublicSans_600SemiBold',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 22,
  },
  body1: {
    fontFamily: 'PublicSans_400Regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'PublicSans_400Regular',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 22,
  },
  caption: {
    fontFamily: 'PublicSans_400Regular',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
  },
  overline: {
    fontFamily: 'PublicSans_500Medium',
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    lineHeight: 13,
  },
  buttonSmall: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 22,
  },
  buttonMedium: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 24,
  },
  buttonLarge: {
    fontFamily: 'PublicSans_700Bold',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 26,
  },
  inputLabel: {
    fontFamily: 'PublicSans_600SemiBold',
    fontWeight: 600,
    fontSize: 12,
  },
}

export const typography: Typography = StyleSheet.create(typographyObject)

export const fontConfig = {
  web: typography,
  ios: typography,
  android: typography,
  default: typography.body1,
}

export const fonts = configureFonts({
  isV3: false,
  config: fontConfig as any,
})
