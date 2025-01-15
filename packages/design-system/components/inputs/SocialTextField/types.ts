import { FC, PropsWithChildren } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { TextFieldProps } from '../TextField/types'
import { TextareaFieldProps } from '../TextareaField/types'

export type SocialTextFieldProps = FormControl &
  TextFieldProps &
  PropsWithChildren & {
    isReply?: boolean
    onCancelReply?: () => void
    replyTargetName?: string | null
    key?: string
    TextField?: FC<TextareaFieldProps> | React.ComponentType<{}>
  }
