import { ForwardedRef } from 'react'

import type { MDXEditorMethods } from '@mdxeditor/editor'

import { MarkdownEditorProps } from '../types'
import type { MentionsActiveConfig } from './plugins/mentions/types'

export type InitializedMDXEditorProps = {
  editorRef: ForwardedRef<MDXEditorMethods> | null
  mentions?: MentionsActiveConfig
} & Omit<MarkdownEditorProps, 'mentions'>
