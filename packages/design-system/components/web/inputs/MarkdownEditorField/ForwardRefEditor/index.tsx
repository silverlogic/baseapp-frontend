'use client'

import { forwardRef } from 'react'

import { type MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import dynamic from 'next/dynamic'

import type { InitializedMDXEditorProps } from '../InitializedMDXEditor/types'
import { MDXEditorLoadingState } from './styled'

type ForwardRefEditorProps = Omit<InitializedMDXEditorProps, 'editorRef'>

const InitializedMDXEditor = dynamic(() => import('../InitializedMDXEditor'), {
  ssr: false,
  loading: () => <MDXEditorLoadingState />,
})

export const ForwardRefEditor = forwardRef<MDXEditorMethods, ForwardRefEditorProps>(
  (props, ref) => <InitializedMDXEditor {...props} editorRef={ref} />,
)
