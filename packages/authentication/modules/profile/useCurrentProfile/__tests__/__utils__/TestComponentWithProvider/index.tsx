import { FC, PropsWithChildren } from 'react'

import { Provider as JotaiProvider } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { MinimalProfile } from '../../../../../../types/profile'
import { profileAtom } from '../../../index'
import TestComponent from '../TestComponent'

export type InitialProfileProp = {
  initialProfile: MinimalProfile | null
}

export const InitialProfileProvider: FC<PropsWithChildren & InitialProfileProp> = ({
  initialProfile,
  children,
}) => {
  useHydrateAtoms([[profileAtom, initialProfile]])
  return children
}

const TestComponentWithProviders = (props: Partial<InitialProfileProp>) => {
  if (props.initialProfile === undefined) {
    return (
      <JotaiProvider>
        <TestComponent />
      </JotaiProvider>
    )
  }
  return (
    <JotaiProvider>
      <InitialProfileProvider initialProfile={props.initialProfile}>
        <TestComponent />
      </InitialProfileProvider>
    </JotaiProvider>
  )
}

export default TestComponentWithProviders
