import { FC } from 'react'

import AvatarUploadFallbackIcon from '../../icons/AvatarUploadFallbackIcon'
import { AvatarStyled } from './styled'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({
  width = 40,
  height = 40,
  children,
  alt,
  ...props
}) => (
  <AvatarStyled width={width} height={height} alt={alt} {...props}>
    {children || (
      <AvatarUploadFallbackIcon sx={{ fontSize: width }} titleAccess="Avatar Fallback" />
    )}
  </AvatarStyled>
)

export default AvatarWithPlaceholder
