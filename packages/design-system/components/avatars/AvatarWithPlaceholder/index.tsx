import { FC } from 'react'

import Image from 'next/image'

import { AvatarStyled } from './styled'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({
  width = 40,
  height = 40,
  children,
  ...props
}) => (
  <AvatarStyled width={width} height={height} {...props}>
    {children || (
      <Image
        src="/svg/avatar-upload-fallback.svg"
        alt="Avatar Fallback"
        width={width}
        height={height}
      />
    )}
  </AvatarStyled>
)

export default AvatarWithPlaceholder
