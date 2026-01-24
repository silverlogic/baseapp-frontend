'use client'

import { FC } from 'react'

import { useFragment } from 'react-relay'

import type { CheckMountPermissionWrapperFragment$key } from '../../../../__generated__/CheckMountPermissionWrapperFragment.graphql'
import { CheckMountPermissionWrapperFragment } from '../../common/graphql/fragments/CheckMountPermissionWrapperFragment'
import PermissionDenied from '../PermissionDenied'
import { ProfilePermissionWrapperProps } from './types'

const CheckPermissionWrapper: FC<ProfilePermissionWrapperProps> = ({ target, children }) => {
  const data = useFragment<CheckMountPermissionWrapperFragment$key>(
    CheckMountPermissionWrapperFragment,
    target,
  )

  if (!data?.canMountComponent) {
    return <PermissionDenied />
  }
  return children
}
export default CheckPermissionWrapper
