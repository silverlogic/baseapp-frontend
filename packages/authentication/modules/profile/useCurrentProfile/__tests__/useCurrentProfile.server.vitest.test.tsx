/**
 * @jest-environment node
 *
 * Cross-request isolation regression: two `initializeProfileStore` calls must produce
 * separate `StoreApi` instances. Runs under `node` to mirror the SSR runtime.
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
