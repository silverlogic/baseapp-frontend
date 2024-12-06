import { FC, PropsWithChildren } from 'react'

import { useHydrateAtoms } from 'jotai/utils'

import { MinimalProfile } from '../../../../../../types/profile'
import { profileAtom } from '../../../index'

export type InitialProfileProp = {
  initialProfile: MinimalProfile | null
}

// Use as:
// <JotaiProvider>
//   <InitialProfileProvider initialProfile={props.initialProfile}>
//     // You're component goes here, it is passed the initialProfile
//   </InitialProfileProvider>
// </JotaiProvider>

export const InitialProfileProvider: FC<PropsWithChildren & InitialProfileProp> = ({
  initialProfile,
  children,
}) => {
  useHydrateAtoms([[profileAtom, initialProfile]])
  return children
}
