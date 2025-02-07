import { PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps } from '../TextField/types'

export type SocialTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
  }
