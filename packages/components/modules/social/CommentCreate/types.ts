import { FC } from 'react'

import { CommentTextFieldProps } from '@baseapp-frontend/design-system'

import { SvgIconProps } from '@mui/material'

export interface CommentCreateProps {
  targetObjectId: string
  autoFocusInput?: boolean
  placeholder?: string
  profileId?: string
  CommentTextField?: FC<CommentTextFieldProps>
  CommentTextFieldProps?: Partial<CommentTextFieldProps>
  CommentUpsertActions?: FC
  SendMessageIcon?: FC<SvgIconProps>
}
