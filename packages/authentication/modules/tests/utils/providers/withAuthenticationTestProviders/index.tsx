import { FC } from 'react'

import { CookieProvider } from '@baseapp-frontend/utils/hooks/useCookie'

import { MinimalProfile } from '../../../../../types/profile'
import { CURRENT_PROFILE_KEY_NAME, CurrentProfileProvider } from '../../../../profile'
import { WithAuthenticationTestProvidersProps } from './types'

const withAuthenticationTestProviders =
  <Props extends object>(Component: FC<Props>) =>
  ({ context, initialCookies, ...props }: Props & WithAuthenticationTestProvidersProps) => {
    const currentProfile = context?.parameters?.initialProfile ?? null

    return (
      <CookieProvider<{ [CURRENT_PROFILE_KEY_NAME]: MinimalProfile }>
        initialCookies={{
          [CURRENT_PROFILE_KEY_NAME]: currentProfile,
          ...initialCookies,
        }}
      >
        <CurrentProfileProvider initialCurrentProfile={currentProfile}>
          <Component {...(props as Props)} {...context} />
        </CurrentProfileProvider>
      </CookieProvider>
    )
  }

export default withAuthenticationTestProviders
