import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  profileSettingsBannerRemoveData,
  profileSettingsBannerUpdateData,
  profileSettingsImageRemoveData,
  profileSettingsImageUpdateData,
  profileSettingsMockData,
  profileSettingsTextUpdateData,
} from '../__mocks__/requests'
import ProfileSettingsForTesting from './ProfileSettingsForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * Ported from `__tests__/ProfileSettings.cy.tsx`. All five of its tests seed the
 * same `ProfileSettingsForTestingQuery` payload and differ only in which
 * mutation they resolve, so one story serves them all — the five resolvers are
 * exposed and each spec drives the one it needs.
 *
 * The Cypress spec wrapped every mount in `AppRouterContext.Provider` fed by
 * `cy.mockNextRouter()`, which stubs `useRouter` at module level. That cannot
 * cross the Node/browser boundary, so the router lives here as a plain object —
 * the React-idiomatic equivalent, and the same approach as Comments.story.
 */
export interface ProfileSettingsControls {
  resolveTextUpdate: () => void
  resolveImageUpdate: () => void
  resolveImageRemove: () => void
  resolveBannerUpdate: () => void
  resolveBannerRemove: () => void
}

declare global {
  interface Window {
    __profileSettingsControls: ProfileSettingsControls
  }
}

const noop = () => {}

const routerMock = {
  push: noop,
  back: noop,
  forward: noop,
  refresh: noop,
  replace: noop,
  prefetch: noop,
}

export const Default = () => {
  const environment = useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'ProfileSettingsForTestingQuery',
      data: profileSettingsMockData,
    })

    const { resolveMostRecentOperation } = testEnvironment

    window.__profileSettingsControls = {
      resolveTextUpdate: () => resolveMostRecentOperation({ data: profileSettingsTextUpdateData }),
      resolveImageUpdate: () =>
        resolveMostRecentOperation({ data: profileSettingsImageUpdateData }),
      resolveImageRemove: () =>
        resolveMostRecentOperation({ data: profileSettingsImageRemoveData }),
      resolveBannerUpdate: () =>
        resolveMostRecentOperation({ data: profileSettingsBannerUpdateData }),
      resolveBannerRemove: () =>
        resolveMostRecentOperation({ data: profileSettingsBannerRemoveData }),
    }

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppRouterContext.Provider value={routerMock as any}>
      <ProfileSettingsForTesting environment={environment} />
    </AppRouterContext.Provider>
  )
}
