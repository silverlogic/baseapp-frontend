import type {
  ClipboardEventHandler,
  ComponentType,
  FC,
  KeyboardEventHandler,
  ReactNode,
  Ref,
} from 'react'

import type { FormControl } from '@baseapp-frontend/utils'

import { type MDXEditorProps } from '@mdxeditor/editor'
import type { BoxProps } from '@mui/material'

import type { MentionsConfig } from './InitializedMDXEditor/plugins/mentions/types'
import type { ToolbarProps } from './Toolbar/types'

export type {
  MentionCommitted,
  MentionProfileSuggestion,
  MentionsConfig,
  MentionsSearchController,
} from './InitializedMDXEditor/plugins/mentions/types'

export interface ToolbarConfig {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  numberedList?: boolean
  bulletList?: boolean
  checklist?: boolean
  link?: boolean
  insertTable?: boolean
  insertCodeBlock?: boolean
  insertImage?: boolean
  insertThematicBreak?: boolean
}

export type EditorContainerProps = BoxProps & {
  minHeight?: number | string
  maxHeight?: number | string
  hasBorder?: boolean
  hasLabel?: boolean
  error?: boolean
}

export type MarkdownEditorProps = MDXEditorProps & {
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>
  toolbarConfig?: Partial<ToolbarConfig>
  showDiffSourceToggle?: boolean
  showUndoRedo?: boolean
  Toolbar?: FC<ToolbarProps>
  ToolbarProps?: Partial<ToolbarProps>
  mentions?: MentionsConfig
}

export type MarkdownEditorFieldCoreProps = Omit<MDXEditorProps, 'markdown'> & {
  value?: string
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onChange?: (value: string) => void
  inputRef?: Ref<HTMLInputElement>
  toolbarConfig?: Partial<ToolbarConfig>
  showDiffSourceToggle?: boolean
  showUndoRedo?: boolean
  minHeight?: number | string
  maxHeight?: number | string
  hasBorder?: boolean
  label?: ReactNode
  labelBackgroundColor?: string
  helperText?: ReactNode
  showHelperText?: boolean
  error?: boolean
  Toolbar?: FC<ToolbarProps>
  ToolbarProps?: Partial<ToolbarProps>
  EditorContainer?: ComponentType<EditorContainerProps>
  EditorContainerProps?: Partial<EditorContainerProps>
  mentions?: MentionsConfig
}

export type MarkdownEditorFieldProps = MarkdownEditorFieldCoreProps & FormControl
