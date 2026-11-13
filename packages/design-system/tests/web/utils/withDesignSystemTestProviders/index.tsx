import { FC } from 'react'

import { NotificationProvider } from '@baseapp-frontend/utils'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { IntlProvider } from 'react-intl'

import { UISettingsProvider } from '../../../../hooks/web'
import enMessages from '../../../../locales/en.json'
import { SnackbarProvider } from '../../../../providers/web'
import { createPalette } from '../../../../styles/web/palette'
import ReactSuspenseWithLoading from '../ReactSuspenseWithLoading'
import ThemeTestProvider from '../ThemeTestProvider'
import { WithDesignSystemProviderProps } from './types'

const withDesignSystemProvider =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithDesignSystemProviderProps) => {
    const {
      ThemeTestProviderProps,
      ReactSuspenseWithLoadingProps,
      UISettingsProviderProps,
      ...restProps
    } = props as Props & WithDesignSystemProviderProps
    const emotionCache = createCache({ key: 'test-key' })

    return (
      <IntlProvider locale="en" messages={enMessages}>
        <ThemeTestProvider {...ThemeTestProviderProps}>
          <NotificationProvider>
            <SnackbarProvider>
              <CacheProvider value={emotionCache}>
                <ReactSuspenseWithLoading {...ReactSuspenseWithLoadingProps}>
                  <UISettingsProvider
                    {...UISettingsProviderProps}
                    palette={UISettingsProviderProps?.palette || createPalette('light')}
                  >
                    <Component {...(restProps as Props)} />
                  </UISettingsProvider>
                </ReactSuspenseWithLoading>
              </CacheProvider>
            </SnackbarProvider>
          </NotificationProvider>
        </ThemeTestProvider>
      </IntlProvider>
    )
  }

export default withDesignSystemProvider
