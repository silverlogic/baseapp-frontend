import { ClipboardEventHandler, KeyboardEventHandler } from 'react'

import { FormControl } from '@baseapp-frontend/utils'

import { type MDXEditorProps } from '@mdxeditor/editor'

export type MarkdownEditorProps = Omit<MDXEditorProps, 'markdown'> &
  FormControl & {
    value?: string
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
    placeholder?: string
    onChange?: (value: string) => void
  }

export interface KeyboardCommandsPluginProps {
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>
}

export type InitializedMDXEditorProps = MDXEditorProps & KeyboardCommandsPluginProps
