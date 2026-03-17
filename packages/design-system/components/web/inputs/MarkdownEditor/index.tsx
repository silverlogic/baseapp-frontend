'use client'

import { FC, useLayoutEffect, useRef } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { type MDXEditorMethods } from '@mdxeditor/editor'

import { ForwardRefEditor } from './ForwardRefEditor'
import './index.css'
import { MarkdownEditorProps } from './types'

const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  ...props
}) => {
  const editorRef = useRef<MDXEditorMethods>(null)

  useLayoutEffect(() => {
    editorRef?.current?.setMarkdown(value || '')
  }, [value])

  return (
    <ForwardRefEditor
      {...props}
      markdown={value || ''}
      placeholder={placeholder}
      onKeyDown={(e) => {
        onKeyDown?.(e)
      }}
      onChange={(content: string) => {
        onChange?.(content)
      }}
      onPaste={(e) => {
        if (e?.clipboardData?.getData('Text')) {
          // editorRef.current?.setMarkdown(e.clipboardData.getData('Text').split('\\').join(''))
          // onChange?.(e.clipboardData.getData('Text').replace(/\\/g, ''))
        }
      }}
      ref={editorRef}
    />
  )
}

export default withController(MarkdownEditor)
