'use client'

import { FC, useEffect, useRef } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import { FormHelperText } from '@mui/material'

import { ForwardRefEditor } from './ForwardRefEditor'
import { EditorContainer as DefaultEditorContainer } from './styled'
import { MarkdownEditorFieldProps } from './types'

const MarkdownEditorField: FC<MarkdownEditorFieldProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  toolbarConfig,
  showDiffSourceToggle,
  showUndoRedo,
  minHeight,
  hasBorder = true,
  helperText,
  error,
  Toolbar,
  ToolbarProps,
  EditorContainer = DefaultEditorContainer,
  EditorContainerProps,
  ...props
}) => {
  const editorRef = useRef<MDXEditorMethods>(null)

  useEffect(() => {
    editorRef?.current?.setMarkdown(value || '')
  }, [value])

  return (
    <div>
      <EditorContainer minHeight={minHeight} hasBorder={hasBorder} {...EditorContainerProps}>
        <ForwardRefEditor
          {...props}
          markdown={value || ''}
          placeholder={placeholder}
          toolbarConfig={toolbarConfig}
          showDiffSourceToggle={showDiffSourceToggle}
          showUndoRedo={showUndoRedo}
          Toolbar={Toolbar}
          ToolbarProps={ToolbarProps}
          onKeyDown={(e) => {
            onKeyDown?.(e)
          }}
          onChange={(content: string) => {
            onChange?.(content)
          }}
          ref={editorRef}
        />
      </EditorContainer>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </div>
  )
}

export default withController(MarkdownEditorField)
