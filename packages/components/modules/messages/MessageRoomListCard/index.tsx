import { FC, SyntheticEvent } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'

import { MessageRoomListCardProps } from './types'

const MessageRoomListCard: FC<MessageRoomListCardProps> = ({
  avatarUrl,
  title,
  subtitle,
  key,
  children,
  handleClick,
}) => {
  const handleCardClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    if (handleClick) handleClick()
  }

  return (
    <Box
      className="grid h-full w-full max-w-[390px] grid-cols-[48px_auto_min-content] gap-3 px-5 py-3 sm:max-w-[600px] sm:px-3"
      key={key}
      onClick={handleCardClick}
    >
      <AvatarWithPlaceholder
        className="self-start justify-self-center"
        width={48}
        height={48}
        src={avatarUrl}
      />
      <div className="grid grid-rows-2">
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </div>
      {children}
    </Box>
  )
}

export default MessageRoomListCard
