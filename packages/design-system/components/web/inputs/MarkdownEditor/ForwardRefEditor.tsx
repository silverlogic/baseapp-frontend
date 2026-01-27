'use client'

import { forwardRef } from 'react'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import dynamic from 'next/dynamic'

import { InitializedMDXEditorProps } from './types'

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
})

export const ForwardRefEditor = forwardRef<MDXEditorMethods, InitializedMDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />,
)

ForwardRefEditor.displayName = 'ForwardRefEditor'
