import { ForwardedRef } from 'react'

import type { MDXEditorMethods } from '@mdxeditor/editor'

import { MarkdownEditorProps } from '../types'

export type InitializedMDXEditorProps = {
  editorRef: ForwardedRef<MDXEditorMethods> | null
} & MarkdownEditorProps
