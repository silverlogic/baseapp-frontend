'use client'

import {
  ClipboardEventHandler,
  FC,
  FocusEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'

import { withController } from '@baseapp-frontend/utils'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import { FormControl, FormHelperText } from '@mui/material'

import { ForwardRefEditor } from './ForwardRefEditor'
import { MENTION_MARKDOWN_PROTOCOL } from './InitializedMDXEditor/plugins/mentions/constants'
import { stripMentionLinksFromMarkdown } from './InitializedMDXEditor/plugins/mentions/utils'
import { EditorContainer as DefaultEditorContainer, StyledInputLabel } from './styled'
import { MarkdownEditorFieldProps } from './types'

const MarkdownEditorField: FC<MarkdownEditorFieldProps> = ({
  value,
  onChange,
  onKeyDown,
  onPaste,
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
  inputRef,
  mentions,
  ...props
}) => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const filled = Boolean(value && value.trim())

  const isMentionsDisabled = mentions?.disabled === true
  const effectiveMentions = isMentionsDisabled ? undefined : mentions
  const sanitizedValue = useMemo(
    () => (isMentionsDisabled ? stripMentionLinksFromMarkdown(value ?? '') : (value ?? '')),
    [value, isMentionsDisabled],
  )

  const handlePaste = useCallback<ClipboardEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (isMentionsDisabled) {
        const text = event.clipboardData?.getData('text/plain') ?? ''
        if (text.includes(MENTION_MARKDOWN_PROTOCOL)) {
          event.preventDefault()
          editorRef.current?.insertMarkdown(stripMentionLinksFromMarkdown(text))
          return
        }
      }
      onPaste?.(event)
    },
    [isMentionsDisabled, onPaste],
  )

  // Expose a minimal HTMLInputElement-compatible proxy so consumers that hold
  // an HTMLInputElement ref (e.g. SocialInput → SocialTextField → here) can
  // still call .focus(), read .value, and invoke .setSelectionRange() — the
  // textarea idiom used by MessageUpdate/CommentUpdate to "focus with caret
  // at end". Reads delegate to MDXEditorMethods; caret positioning is
  // absorbed into focus() via defaultSelection: 'rootEnd'.
  useImperativeHandle(
    inputRef,
    () =>
      ({
        get value() {
          return editorRef.current?.getMarkdown() ?? ''
        },
        setSelectionRange: () => {},
        focus: (options?: FocusOptions) => {
          editorRef.current?.focus(undefined, {
            preventScroll: options?.preventScroll,
            defaultSelection: 'rootEnd',
          })
        },
      }) as unknown as HTMLInputElement,
    [],
  )

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback((e: FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setFocused(false)
    }
  }, [])

  useEffect(() => {
    const currentMarkdown = editorRef?.current?.getMarkdown()?.trim()
    const incomingValue = sanitizedValue.trim()
    if (currentMarkdown !== incomingValue) {
      editorRef?.current?.setMarkdown(sanitizedValue)
    }
  }, [sanitizedValue])

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
        markdown={sanitizedValue}
        placeholder={label ? undefined : placeholder}
        toolbarConfig={toolbarConfig}
        showDiffSourceToggle={showDiffSourceToggle}
        showUndoRedo={showUndoRedo}
        Toolbar={Toolbar}
        ToolbarProps={ToolbarProps}
        mentions={effectiveMentions}
        onKeyDown={(e) => {
          onKeyDown?.(e)
        }}
        onPaste={handlePaste}
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
