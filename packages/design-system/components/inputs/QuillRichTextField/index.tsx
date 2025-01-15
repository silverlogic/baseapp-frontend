import React, { FC, useEffect, useRef } from 'react'

import { withController } from '@baseapp-frontend/utils'

import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

import './styles.css'
import { RichTextEditorProps } from './types'
import { cleanEditorContent, formatMarkdown } from './utils'

const RichTextEditor: FC<RichTextEditorProps> = ({
  key,
  autoFocus,
  inputRef,
  onKeyDown,
  placeholder = '',
  value,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'bubble',
        placeholder,
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'link']],
          clipboard: {
            matchVisual: false,
          },
        },
      })

      if (autoFocus) {
        quillRef.current.focus()
      }

      if (inputRef) {
        const mutableRef = inputRef as React.MutableRefObject<Quill | null>
        mutableRef.current = quillRef.current
      }

      quillRef.current.on(Quill.events.TEXT_CHANGE, () => {
        if (quillRef.current) {
          formatMarkdown(quillRef.current)
          const editorContent = quillRef.current.root.innerHTML
          onChange?.(cleanEditorContent(editorContent))
        }
      })

      const rootElement = editorRef.current.querySelector('.ql-editor')
      if (rootElement) {
        rootElement.addEventListener('keydown', (event) => {
          onKeyDown?.(event as unknown as React.KeyboardEvent)
        })
      }
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null
      }
    }
  }, [key])

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <div>
      <div ref={editorRef} />
    </div>
  )
}

export default withController(RichTextEditor)
