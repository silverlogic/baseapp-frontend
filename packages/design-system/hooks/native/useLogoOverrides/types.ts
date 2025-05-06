export type LogoOverrideObject = {
  base64: string
  mimeType: string
}

export type LogoOverrides = {
  default?: LogoOverrideObject
  square?: LogoOverrideObject
}

export type LogoOverridesKeys = keyof LogoOverrides

export type LogoOverrideState = {
  settings: LogoOverrides
}

type LogoOverrideFunctions = {
  setLogoOverride: (newLogos: Partial<LogoOverrides>) => void
}

export type UseLogoOverrides = LogoOverrideState & LogoOverrideFunctions
