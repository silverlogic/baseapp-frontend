'use client'

import React, { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

import './index.css'
// TODO check custom css is not appling with the new build method
import { MarkdownEditorProps } from './types'

const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  ...props
}) => (
  <div className="container" style={{ maxWidth: '100%', width: '100%' }}>
    <div data-color-mode="light">
      <MDEditor
        height={150}
        preview="edit"
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        textareaProps={{
          placeholder,
          onKeyDown: (e) => {
            onKeyDown?.(e)
          },
        }}
        {...props}
      />
    </div>
  </div>
)

export default withController(MarkdownEditor)
