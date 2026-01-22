'use client'

import { FC } from 'react'

import { CheckMountPermissionWrapper } from '@baseapp-frontend/components/profiles/common'

import { useFragment } from 'react-relay'

import PermissionDenied from '../PermissionDenied'
import { ProfilePermissionWrapperProps } from './types'

const CheckPermissionWrapper: FC<ProfilePermissionWrapperProps> = ({ target, children }) => {
  const data = useFragment(CheckMountPermissionWrapper, target)
  if (!data?.canMountComponent) {
    return <PermissionDenied />
  }
  return children
}
export default CheckPermissionWrapper
