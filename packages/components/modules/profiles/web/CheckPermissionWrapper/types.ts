import { ReactNode } from 'react'

import { ProfileByIdQuery$data } from '../../../../__generated__/ProfileByIdQuery.graphql'

export interface ProfilePermissionWrapperProps {
  target: ProfileByIdQuery$data['profile'] | null | undefined
  children: ReactNode
}
