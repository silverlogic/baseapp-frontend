import { FC } from 'react'

import { AvatarDeletedUserIcon } from '../../icons'
import AvatarUploadFallbackIcon from '../../icons/AvatarUploadFallbackIcon'
import { AvatarStyled } from './styled'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({
  width = 40,
  height = 40,
  children,
  alt,
  showDeletedUser = false,
  ...props
}) => (
  <AvatarStyled width={width} height={height} alt={alt} {...props}>
    {children ||
      (showDeletedUser ? (
        <AvatarDeletedUserIcon sx={{ fontSize: width }} titleAccess="Deleted User Avatar" />
      ) : (
        <AvatarUploadFallbackIcon sx={{ fontSize: width }} titleAccess="Avatar Fallback" />
      ))}
  </AvatarStyled>
)

export default AvatarWithPlaceholder
