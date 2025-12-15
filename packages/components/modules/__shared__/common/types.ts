import { ReactNode } from 'react'

export type SocialUpsertForm = {
  body: string
}

export interface SearchNotFoundStateProps {
  message?: string
}

export interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}
