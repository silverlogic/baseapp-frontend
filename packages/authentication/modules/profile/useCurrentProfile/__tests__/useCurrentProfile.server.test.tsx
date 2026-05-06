/**
 * @jest-environment node
 *
 * Cross-request isolation regression test for the profile store.
 *
 * The bug: a module-level `let profileStore: ... | null = null` cache caused two
 * Provider mounts in the same Node process to share state. In production SSR,
 * one user's render leaked their profile into the next user's render.
 *
 * The post-fix invariant: every call to `initializeProfileStore` produces a fresh,
 * isolated StoreApi. This test runs with `@jest-environment node` so it mirrors the
 * production SSR runtime where `typeof window === 'undefined'`.
 *
 * Pre-fix: this test FAILS (second store inherits first store's mutation).
 * Post-fix: this test PASSES and stays green only as long as the fix stays in place.
 */
import { initializeProfileStore } from '../store'
import { mockUserProfileFactory } from './__mock__/profiles'

describe('profile store cross-Provider isolation', () => {
  it('two initializeProfileStore calls produce isolated stores', () => {
    const profileA = mockUserProfileFactory('profile-a')
    const mutated = mockUserProfileFactory('profile-mutated')

    const storeA = initializeProfileStore(profileA)
    expect(storeA.getState().currentProfile).toEqual(profileA)

    storeA.getState().setCurrentProfile(mutated)
    expect(storeA.getState().currentProfile).toEqual(mutated)

    const storeB = initializeProfileStore()
    expect(storeB).not.toBe(storeA)
    expect(storeB.getState().currentProfile).toBeNull()

    // Mutations on storeB must not leak back into storeA.
    storeB.getState().setCurrentProfile(mockUserProfileFactory('profile-b'))
    expect(storeA.getState().currentProfile).toEqual(mutated)
  })

  it('null/undefined initial profile produces a fresh empty store every time', () => {
    const first = initializeProfileStore()
    first.getState().setCurrentProfile(mockUserProfileFactory('first'))

    const second = initializeProfileStore(null)
    expect(second).not.toBe(first)
    expect(second.getState().currentProfile).toBeNull()

    const third = initializeProfileStore(undefined)
    expect(third).not.toBe(second)
    expect(third.getState().currentProfile).toBeNull()
  })
})
