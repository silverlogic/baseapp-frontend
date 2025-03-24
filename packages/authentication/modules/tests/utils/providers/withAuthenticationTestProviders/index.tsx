import { FC } from 'react'

import { Provider as JotaiProvider } from 'jotai'

import InitialProfileProviderForTesting from '../InitialProfileProviderForTesting'
import { WithAuthenticationTestProvidersProps } from './types'

const withAuthenticationTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithAuthenticationTestProvidersProps) => {
    const { InitialProfileProviderForTestingProps, ...restProps } = props
    return (
      <JotaiProvider>
        <InitialProfileProviderForTesting {...InitialProfileProviderForTestingProps}>
          <Component {...(restProps as Props)} />
        </InitialProfileProviderForTesting>
      </JotaiProvider>
    )
  }

export default withAuthenticationTestProviders
