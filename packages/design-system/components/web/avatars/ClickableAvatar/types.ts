import { IconButtonProps } from '@mui/material'

import { AvatarWithPlaceholderProps } from '../AvatarWithPlaceholder/types'

export interface CustomIconButtonProps
  extends IconButtonProps,
    Required<Pick<ClickableAvatarProps, 'width' | 'height' | 'isOpen'>> {}

export type ClickableAvatarProps = AvatarWithPlaceholderProps & {
  deletedUser?: boolean
  isOpen?: boolean
  onClick?: (param: any) => void
}
