import { FC } from 'react'

import { NotificationProvider } from '@baseapp-frontend/utils'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { SnackbarProvider } from '../../../../../providers/web'
import ReactSuspenseWithLoading from '../ReactSuspenseWithLoading'
import ThemeTestProvider from '../ThemeTestProvider'
import { WithDesignSystemProviderProps } from './types'

const withDesignSystemProvider =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithDesignSystemProviderProps) => {
    const { ThemeTestProviderProps, ReactSuspenseWithLoadingProps, ...restProps } = props as Props &
      WithDesignSystemProviderProps
    const emotionCache = createCache({ key: 'test-key' })

    return (
      <ThemeTestProvider {...ThemeTestProviderProps}>
        <NotificationProvider>
          <SnackbarProvider>
            <CacheProvider value={emotionCache}>
              <ReactSuspenseWithLoading {...ReactSuspenseWithLoadingProps}>
                <Component {...(restProps as Props)} />
              </ReactSuspenseWithLoading>
            </CacheProvider>
          </SnackbarProvider>
        </NotificationProvider>
      </ThemeTestProvider>
    )
  }

export default withDesignSystemProvider
