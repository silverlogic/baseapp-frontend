// exports web design-system tests

export { default as ThemeTestProvider } from './utils/ThemeTestProvider'
export type { ThemeTestProviderProps } from './utils/ThemeTestProvider/types'

export { default as ReactSuspenseWithLoading } from './utils/ReactSuspenseWithLoading'
export type { ReactSuspenseWithLoadingProps } from './utils/ReactSuspenseWithLoading/types'

export { default as withDesignSystemTestProviders } from './utils/withDesignSystemTestProviders'
export type { WithDesignSystemProviderProps } from './utils/withDesignSystemTestProviders/types'

export * from './utils/__mocks__/theme'
