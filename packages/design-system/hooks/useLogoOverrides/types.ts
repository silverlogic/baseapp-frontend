export type LogoOverrides = {
  default?: string
  square?: string
}

export type LogoOverrideState = {
  settings: LogoOverrides
}

type LogoOverrideFunctions = {
  setLogoOverride: (newLogos: Partial<LogoOverrides>) => void
}

export type UseLogoOverrides = LogoOverrideState & LogoOverrideFunctions
