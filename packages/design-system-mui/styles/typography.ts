import { palette } from './palette'
import { fontSize } from './utils'

export const typography = {
  fontFamily: 'Roboto',
  fontSize: 16,
  color: palette.surface[900],
  h1: {
    fontSize: fontSize(80),
    fontWeight: 900,
    lineHeight: fontSize(88),
    letterSpacing: -fontSize(2.5),
  },
  h2: {
    fontSize: fontSize(48),
    fontWeight: 600,
    lineHeight: fontSize(57.6),
    letterSpacing: -fontSize(1),
  },
  h3: {
    fontSize: fontSize(36),
    fontWeight: 600,
    lineHeight: fontSize(43.2),
  },
  h4: {
    fontSize: fontSize(30),
    fontWeight: 600,
    lineHeight: fontSize(39),
  },
  h5: {
    fontSize: fontSize(20),
    fontWeight: 600,
    lineHeight: fontSize(31.2),
  },
  h6: {
    fontSize: fontSize(20),
    fontWeight: 700,
    lineHeight: fontSize(26),
  },
  subtitle1: {
    fontSize: fontSize(18),
    fontWeight: 600,
    lineHeight: fontSize(23.4),
  },
  subtitle2: {
    fontSize: fontSize(16),
    fontWeight: 700,
    lineHeight: fontSize(20.8),
  },
  body1: {
    fontSize: fontSize(14),
    fontWeight: 400,
    lineHeight: fontSize(18.2),
  },
  body2: {
    fontSize: fontSize(14),
    fontWeight: 600,
    lineHeight: fontSize(18.2),
  },
  caption: {
    fontSize: fontSize(12),
    fontWeight: 400,
    lineHeight: fontSize(15.6),
  },
  overline: {
    fontSize: fontSize(10),
    fontWeight: 600,
    lineHeight: fontSize(13),
    letterSpacing: fontSize(1),
  },
}
