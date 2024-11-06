import { PropsWithChildren } from 'react'

export interface MessageRoomListCardProps extends PropsWithChildren {
  key: string
  avatarUrl?: string
  title?: string | null
  subtitle?: string | null
  handleClick?: () => void
}
