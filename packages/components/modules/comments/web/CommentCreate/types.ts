import { FC } from 'react'

import type { MentionsSearchController } from '@baseapp-frontend/design-system/components/web/inputs'

import type { SocialInputProps } from '../../../__shared__/web'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
  mentionsController?: MentionsSearchController
  disableMentions?: boolean
}
