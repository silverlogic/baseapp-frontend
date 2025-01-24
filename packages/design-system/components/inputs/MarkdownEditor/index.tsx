'use client'

import React, { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import MDEditor from '@uiw/react-md-editor'

import './MarkdownEditorStyles.css'
import { MarkdownEditorProps } from './types'

const MarkdownEditor: FC<MarkdownEditorProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  ...props
}) => (
  <div className="container">
    <div data-color-mode="light">
      <MDEditor
        height={150}
        preview="edit"
        value={value}
        onChange={onChange}
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
