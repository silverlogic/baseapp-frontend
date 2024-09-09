'use client'

// styles configuration
import './styles/tailwind/globals.css'

export * from './styles/breakpoint'
export * from './styles/font'
export * from './styles/palette'
export * from './styles/presets'
export * from './styles/shadow'
export * from './styles/typography'

export * from './styles/tailwind/plugins'

export { componentsOverrides } from './styles/material/overrides'
export { createContrast } from './styles/material/options/contrast'
export { createCustomShadows } from './styles/material/custom-shadows'
export * from './styles/material/css'

// components
export * from './components/animate'
export * from './components/avatars'
export * from './components/buttons'
export * from './components/dialogs'
export * from './components/displays'
export * from './components/drawers'
export * from './components/icons'
export * from './components/inputs'
export * from './components/typographies'

export { default as Iconify } from './components/Iconify'
export type * from './components/Iconify/types'

export { default as Scrollbar } from './components/Scrollbar'
export type * from './components/Scrollbar/types'

export { default as ProjectLogo } from './components/ProjectLogo'
export type * from './components/ProjectLogo/types'

export { default as CustomLogoCondensed } from './components/CustomLogoCondensed'

export { default as Logo } from './components/Logo'
export type * from './components/Logo/types'

export { default as Popover } from './components/Popover'
export type * from './components/Popover/types'

export { default as Dropzone } from './components/Dropzone'
export type * from './components/Dropzone/types'

// providers
export { default as MotionLazyProvider } from './providers/MotionLazyProvider'

export { default as SnackbarProvider } from './providers/SnackbarProvider'
export type { SnackbarProviderProps } from './providers/SnackbarProvider/types'

export { default as ThemeProvider } from './providers/ThemeProvider'
export type { ThemeProviderProps } from './providers/ThemeProvider/types'

// hooks
export * from './hooks/useLogoOverrides'
export * from './hooks/useResponsive'
export * from './hooks/usePopover'

// types
export type * from './types'
