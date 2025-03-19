import { PropsWithChildren } from 'react'

export interface BodyProps extends PropsWithChildren {
  title?: string | null
  avatar?: string
  participantsCount?: number
}
