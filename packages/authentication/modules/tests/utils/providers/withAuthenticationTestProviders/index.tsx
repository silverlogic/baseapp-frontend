import { FC } from 'react'

import { CookieProvider } from '@baseapp-frontend/utils'

import { MinimalProfile } from '../../../../../types/profile'
import { CURRENT_PROFILE_KEY_NAME, CurrentProfileProvider } from '../../../../profile'
import { WithAuthenticationTestProvidersProps } from './types'

const withAuthenticationTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  ({ context, initialCookies, ...props }: Props & WithAuthenticationTestProvidersProps) => {
    const currentProfile = context?.parameters?.initialProfile

    return (
      <CookieProvider<{ [CURRENT_PROFILE_KEY_NAME]: MinimalProfile }>
        initialCookies={{
          [CURRENT_PROFILE_KEY_NAME]: currentProfile,
          ...initialCookies,
        }}
      >
        <CurrentProfileProvider>
          <Component {...(props as Props)} {...context} />
        </CurrentProfileProvider>
      </CookieProvider>
    )
  }

export default withAuthenticationTestProviders
