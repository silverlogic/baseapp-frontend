'use client'

import { FC, FocusEvent, useCallback, useEffect, useRef, useState } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import { FormControl, FormHelperText } from '@mui/material'

import { ForwardRefEditor } from './ForwardRefEditor'
import { EditorContainer as DefaultEditorContainer, StyledInputLabel } from './styled'
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
  maxHeight = 300,
  hasBorder = true,
  label,
  labelBackgroundColor,
  helperText,
  showHelperText = true,
  error,
  Toolbar,
  ToolbarProps,
  EditorContainer = DefaultEditorContainer,
  EditorContainerProps,
  ...props
}) => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const filled = Boolean(value && value.trim())

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback((e: FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setFocused(false)
    }
  }, [])

  useEffect(() => {
    editorRef?.current?.setMarkdown(value || '')
  }, [value])

  const editorContent = (
    <EditorContainer
      ref={containerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      minHeight={minHeight}
      maxHeight={maxHeight}
      hasBorder={hasBorder}
      hasLabel={!!label}
      error={error}
      {...EditorContainerProps}
    >
      <ForwardRefEditor
        {...props}
        markdown={value || ''}
        placeholder={label ? undefined : placeholder}
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
  )

  if (label) {
    return (
      <FormControl focused={focused} error={error} fullWidth>
        <StyledInputLabel shrink={focused || filled} labelBackgroundColor={labelBackgroundColor}>
          {label}
        </StyledInputLabel>
        {editorContent}
        {showHelperText && helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    )
  }

  return (
    <div>
      {editorContent}
      {showHelperText && helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </div>
  )
}

export default withController(MarkdownEditorField)
