'use client'

import { forwardRef } from 'react'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import dynamic from 'next/dynamic'

import { MarkdownEditorProps } from '../types'
import { MDXEditorLoadingState } from './styled'

const InitializedMDXEditor = dynamic(() => import('../InitializedMDXEditor'), {
  ssr: false,
  loading: () => <MDXEditorLoadingState />,
})

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MarkdownEditorProps>((props, ref) => (
  <InitializedMDXEditor {...props} editorRef={ref} />
))
