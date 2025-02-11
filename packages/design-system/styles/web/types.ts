export type ThemeMode = 'light' | 'dark'

export type ThemeContrast = 'default' | 'bold'

export type ThemeLayout = 'vertical' | 'horizontal' | 'mini' | 'centered'

export type PresetType =
  | 'default'
  | 'cyan'
  | 'purple'
  | 'blue'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'

export type UISettings = {
  themeStretch: boolean
  themeMode: ThemeMode
  themeContrast: ThemeContrast
  themeLayout: ThemeLayout
  themeColorPresets: PresetType
}

export type ColorScheme = {
  lighter: string
  light: string
  main: string
  dark: string
  darker: string
  contrastText: string
}

type GreyScale = {
  [key: number]: string
}

type CommonColors = {
  black: string
  white: string
}

type ActionColors = {
  hover: string
  selected: string
  disabled: string
  disabledBackground: string
  focus: string
  hoverOpacity: number
  disabledOpacity: number
}

type TextColors = {
  primary: string
  secondary: string
  disabled: string
}

type BackgroundColors = {
  paper: string
  default: string
  neutral: string
}

export type Palette = {
  mode: ThemeMode
  primary: ColorScheme
  secondary: ColorScheme
  info: ColorScheme
  success: ColorScheme
  warning: ColorScheme
  error: ColorScheme
  grey: GreyScale
  common: CommonColors
  divider: string
  action: ActionColors
  text: TextColors
  background: BackgroundColors
}

export type Breakpoint = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export type CustomShadows = {
  z1: string
  z4: string
  z8: string
  z12: string
  z16: string
  z20: string
  z24: string
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
  card: string
  dialog: string
  dropdown: string
}
