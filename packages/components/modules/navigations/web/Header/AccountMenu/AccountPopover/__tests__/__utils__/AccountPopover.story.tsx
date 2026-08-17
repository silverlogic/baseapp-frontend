import { FC, useEffect, useMemo, useState } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'
import { LOGOUT_EVENT, subscribeToBroadcastEvent } from '@baseapp-frontend/utils'
import { ACCESS_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'

import AccountPopoverForTesting from '../AccountPopoverForTesting'
import {
  mockAddProfileData,
  mockProfilesListFactory,
  mockUserProfileData,
} from '../__mocks__/profiles'
import { userMockData } from '../__mocks__/user'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/AccountPopover.cy.tsx`, which stubs three exported
 * hooks at module level — `useJWTUser`, `useLogout` and `useNotification`. That
 * is impossible across the Node/browser boundary, so each is replaced by a real
 * injection point:
 *
 *   useJWTUser      Seed the access-token cookie through the harness's
 *                   `initialCookies`. `useJWTUser` decodes it into
 *                   `placeholderData`, so the user renders without a stub.
 *   useLogout       Not injectable — `LogoutItem` calls `useLogout()` bare. But
 *                   `logout()` ends in `broadcastEvent(LOGOUT_EVENT)`, so the
 *                   story subscribes and records it. This is a stronger check
 *                   than the original spy: it proves logout ran its side effects
 *                   rather than merely that a function was invoked.
 *   useNotification Left alone — every `sendToastSpy` assertion in the Cypress
 *                   spec is commented out.
 *
 * The fixtures use unseeded `faker`, so they generate different values in Node
 * than in the browser. They are therefore exposed on `window` as plain JSON for
 * the spec to read, keeping `__mocks__/` as the single source of truth.
 */
export interface AccountPopoverFixtures {
  user: typeof userMockData
  profile: typeof mockUserProfileData
  profileList: ReturnType<typeof mockProfilesListFactory>
}

export interface AccountPopoverControls {
  resolveAddProfile: () => void
  resolveProfilesList: () => void
}

declare global {
  interface Window {
    __accountPopoverFixtures: AccountPopoverFixtures
    __accountPopoverControls: AccountPopoverControls
  }
}

/** Minimal unsigned JWT — `decodeJWT` only base64-decodes and camelizes the payload. */
const toJwt = (payload: object) => {
  const encode = (value: object) =>
    btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`
}

const profileList = mockProfilesListFactory(mockUserProfileData)

const useAccountPopoverScenario = () => {
  const [logoutCount, setLogoutCount] = useState(0)

  const environment = useMemo(() => {
    const testEnvironment = createTestEnvironment()

    window.__accountPopoverControls = {
      resolveAddProfile: () =>
        testEnvironment.resolveMostRecentOperation({ data: mockAddProfileData() }),
      resolveProfilesList: () => testEnvironment.resolveMostRecentOperation({ data: profileList }),
    }

    window.__accountPopoverFixtures = {
      user: userMockData,
      profile: mockUserProfileData,
      profileList,
    }

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => subscribeToBroadcastEvent(LOGOUT_EVENT, () => setLogoutCount((count) => count + 1)),
    [],
  )

  return { environment, logoutCount }
}

const Recorder: FC<{ logoutCount: number }> = ({ logoutCount }) => (
  <form hidden>
    <input data-testid="logout-count" readOnly value={String(logoutCount)} />
  </form>
)

const initialCookies = { [ACCESS_KEY_NAME]: toJwt(userMockData) }

/** No current profile — the popover shows the user's name and email. */
export const WithoutProfile = () => {
  const { environment, logoutCount } = useAccountPopoverScenario()

  return (
    <>
      <AccountPopoverForTesting environment={environment} initialCookies={initialCookies} />
      <Recorder logoutCount={logoutCount} />
    </>
  )
}

/** A current profile is set, so the popover shows the profile name and url path. */
export const WithProfile = () => {
  const { environment, logoutCount } = useAccountPopoverScenario()

  return (
    <>
      <AccountPopoverForTesting
        environment={environment}
        initialCookies={initialCookies}
        context={{ parameters: { initialProfile: mockUserProfileData } } as any}
      />
      <Recorder logoutCount={logoutCount} />
    </>
  )
}

/** Every sub-component label and size overridden, for the custom-props test. */
export const WithCustomProps = () => {
  const { environment, logoutCount } = useAccountPopoverScenario()

  return (
    <>
      <AccountPopoverForTesting
        environment={environment}
        initialCookies={initialCookies}
        context={{ parameters: { initialProfile: mockUserProfileData } } as any}
        MenuItemsProps={{ menuItems: [{ label: 'Custom Menu Item', onClick: () => {} }] }}
        SwitchProfileMenuProps={{ switchProfileLabel: 'Change profile' }}
        ProfilesListProps={{
          cancelLabel: 'Close',
          listMaxHeight: 240,
          MenuItemProps: { width: 24, height: 24 },
        }}
        AddProfileMenuItemProps={{ addNewProfileLabel: 'Add organization' }}
        LogoutItemProps={{ logoutButtonLabel: 'Sign Out' }}
      />
      <Recorder logoutCount={logoutCount} />
    </>
  )
}
