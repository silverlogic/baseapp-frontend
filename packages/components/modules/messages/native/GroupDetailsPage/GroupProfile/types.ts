import { FC } from 'react'

import { CircledAvatarProps } from '@baseapp-frontend/design-system/components/native/avatars'

import { GroupDetailsQuery$data } from '../../../../../__generated__/GroupDetailsQuery.graphql'

export interface GroupProfileProps {
  group: GroupDetailsQuery$data['chatRoom']
  CircledAvatar?: FC<CircledAvatarProps>
  CircledAvatarProps?: Partial<CircledAvatarProps>
}
