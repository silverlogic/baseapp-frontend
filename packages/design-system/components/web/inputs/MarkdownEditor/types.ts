import { KeyboardEventHandler } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { MDEditorProps } from '@uiw/react-md-editor'

export type MarkdownEditorProps = MDEditorProps &
  FormControl & {
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
    placeholder?: string
  }
