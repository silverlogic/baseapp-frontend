import type {
  ClipboardEventHandler,
  ComponentType,
  FC,
  KeyboardEventHandler,
  ReactNode,
} from 'react'

import type { FormControl } from '@baseapp-frontend/utils'

import { type MDXEditorProps } from '@mdxeditor/editor'
import type { BoxProps } from '@mui/material'

import type { ToolbarProps } from './Toolbar/types'

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
}

export type MarkdownEditorFieldCoreProps = Omit<MDXEditorProps, 'markdown'> & {
  value?: string
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onChange?: (value: string) => void
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
}

export type MarkdownEditorFieldProps = MarkdownEditorFieldCoreProps & FormControl
