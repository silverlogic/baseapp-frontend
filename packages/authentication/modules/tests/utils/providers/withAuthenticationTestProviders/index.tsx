import { FC } from 'react'

import { Provider as JotaiProvider } from 'jotai'

import InitialProfileProviderForTesting from '../InitialProfileProviderForTesting'
import { WithAuthenticationTestProvidersProps } from './types'

const withAuthenticationTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props & WithAuthenticationTestProvidersProps) => {
    const { InitialProfileProviderForTestingProps, context, ...restProps } = props

    const currentProfile =
      context?.parameters?.initialProfile || InitialProfileProviderForTestingProps?.initialProfile

    return (
      <JotaiProvider>
        <InitialProfileProviderForTesting initialProfile={currentProfile}>
          <Component {...(restProps as Props)} />
        </InitialProfileProviderForTesting>
      </JotaiProvider>
    )
  }

export default withAuthenticationTestProviders
