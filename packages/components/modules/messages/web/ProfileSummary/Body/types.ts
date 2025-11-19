import { PropsWithChildren } from 'react'

export interface BodyProps extends PropsWithChildren {
  avatar?: string
  avatarSize?: number
  biography?: string | null
  name?: string | null
  username?: string | null
  pk?: number | undefined
}
