'use client'

import { FC } from 'react'

import { useIntl } from 'react-intl'

import { AvatarDeletedUserIcon } from '../../icons'
import AvatarUploadFallbackIcon from '../../icons/AvatarUploadFallbackIcon'
import { AvatarStyled } from './styled'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({
  width = 40,
  height = 40,
  borderStyle = 'solid',
  borderWidth = '2px',
  children,
  alt,
  showDeletedUser = false,
  ...props
}) => {
  const intl = useIntl()

  return (
    <AvatarStyled
      width={width}
      height={height}
      alt={alt}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      {...props}
    >
      {children ||
        (showDeletedUser ? (
          <AvatarDeletedUserIcon
            sx={{ fontSize: width }}
            titleAccess={intl.formatMessage({
              id: 'designSystem.avatar.deletedUser',
              defaultMessage: 'Deleted User Avatar',
            })}
          />
        ) : (
          <AvatarUploadFallbackIcon
            sx={{ fontSize: width }}
            titleAccess={intl.formatMessage({
              id: 'designSystem.avatar.fallback',
              defaultMessage: 'Avatar Fallback',
            })}
          />
        ))}
    </AvatarStyled>
  )
}

export default AvatarWithPlaceholder
