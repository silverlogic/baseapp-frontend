'use client'

import { FC } from 'react'

import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'

import { CommentItemAvatarProps } from '../types'

const DefaultAvatar: FC<CommentItemAvatarProps> = ({ profileName: _profileName, ...props }) => (
  <ClickableAvatar {...props} />
)

export default DefaultAvatar
