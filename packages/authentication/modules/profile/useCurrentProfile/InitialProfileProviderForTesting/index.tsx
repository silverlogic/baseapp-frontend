import { FC } from 'react'

import { useHydrateAtoms } from 'jotai/utils'

import { profileAtom } from '..'
import { InitialProfileProviderForTestingProps } from './types'

/**
 * InitialProfileProviderForTesting component.
 *
 * This component is used to provide an initial profile state for testing purposes.
 * It uses the `useHydrateAtoms` hook from `jotai/utils` to set the initial state of the `profileAtom`.
 *
 * @component
 * @example
 * ```tsx
 * <JotaiProvider>
 *   <InitialProfileProviderForTesting initialProfile={props.initialProfile}>
 *     // Your component goes here, it is passed the initialProfile
 *   </InitialProfileProviderForTesting>
 * </JotaiProvider>
 * ```
 */
const InitialProfileProviderForTesting: FC<InitialProfileProviderForTestingProps> = ({
  initialProfile,
  children,
}) => {
  useHydrateAtoms([[profileAtom, initialProfile]])
  return children
}

export default InitialProfileProviderForTesting
