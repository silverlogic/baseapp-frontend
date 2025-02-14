// Palette
export type ColorVariant = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

export type ColorTone = {
  lighter: string
  light: string
  main: string
  dark: string
  darker: string
}

export type TransparentColors = {
  8: string
  12: string
  16: string
  20: string
  24: string
  32: string
  48: string
  56?: string
  64?: string
  72?: string
  80?: string
}

export type GradientColors = {
  main: string
  bold: string
}

export type ColorShade = {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

// System Tokens

/**
 * Object token.
 *
 * @description
 * Conceptually, objects are a tangible entity that draws focus of attention, creating points of interest.
 *
 * Object color tokens are to be used by texts, icons and primary shapes.
 */
export type ObjectToken = {
  /**
   * Addressing the primary point of interest in the interface visual hierarchy.
   */
  high: string
  /**
   * Addressing the secondary point of interest in the interface visual hierarchy.
   */
  low: string
  /**
   * Addressing a disabled point of interest in the interface visual hierarchy.
   */
  disabled: string
  /**
   * Addressing Objects applied on top of High Object token shapes.
   */
  contrast: string
}

/**
 * Surface token.
 *
 * @description
 * Conceptually, a surface is where objects are placed, creating boundaries, depth and layout structures.
 *
 * Surface color tokens are to e used by frames, containers and secondary shapes.
 */
export type SurfaceToken = {
  /**
   * The ground zero of an interface, where all other elements will be placed on top. Indicates the lowest level of depth.
   */
  background: string
  /**
   * Surface of elements that are placed on top of backgrounds. Indicates a top level of depth.
   */
  default: string
  /**
   * Overlay for when a container and its content are active. To be used when there’s contrast to non-active elements.
   */
  active: string
  /**
   * Overlay for when a container and its content are disabled. To be used when there’s contrast to enabled elements.
   */
  disabled: string
  /**
   * While used in strokes and shapes it indicates the boundaries or divisions of surfaces.
   */
  border: string
}

/**
 * Color token.
 *
 * @description
 * Color tokens are used to accent the brand identity (Primary and Secondary) or to convey an intended meaning (Info, Success, Warning and Error).
 *
 * They are to be used replacing Object and Surface tokens.
 */
export type ColorToken = {
  /**
   * Applied when a higher contrast is needed, comparing to using the Main token.
   */
  high: string
  /**
   * Default color value for Color Objects and Surfaces.
   */
  main: string
  /**
   * Applied when a lower contrast is needed, comparing to using the Main token.
   */
  low: string
  /**
   * Core low contrast and hierarchy Color Surface.
   */
  overlay: string
  /**
   * Addressing Objects applied on top of Main Color token shapes.
   */
  contrast: string
}

type ColorTokens = Record<ColorVariant, ColorToken>

export interface SystemTokens extends ColorTokens {
  object: ObjectToken
  surface: SurfaceToken
}

// Typography
export type FontVariants =
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'overline'
  | 'buttonSmall'
  | 'buttonMedium'
  | 'buttonLarge'
  | 'inputLabel'

export type Typography = {
  [key in FontVariants]: {
    fontFamily: string
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    fontSize: number
    lineHeight?: number
    letterSpacing?: number
    textTransform?: 'uppercase' | 'none' | 'capitalize' | 'lowercase'
  }
}

// Shadow
export type VariantShadow = Record<ColorVariant, string>

export type ComponentShadow = {
  card: string
  dropdown: string
  dialog: string
}

export type ZShadow = {
  z1: string
  z4: string
  z8: string
  z12: string
  z16: string
  z20: string
  z24: string
}

// Theme
export type Theme = {
  typography: Typography
  shadow: {
    variant: VariantShadow
    component: ComponentShadow
    z: ZShadow
  }
  colors: SystemTokens
}
