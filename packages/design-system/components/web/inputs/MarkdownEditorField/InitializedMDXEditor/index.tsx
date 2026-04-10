'use client'

import { FC, useCallback, useMemo } from 'react'

import {
  MDXEditor,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'

import DefaultToolbar from '../Toolbar'
import { CODE_BLOCK_LANGUAGES, DEFAULT_TOOLBAR_CONFIG } from '../constants'
import { keyboardCommandsPlugin } from './plugins/keyboard-commands'
import { InitializedMDXEditorProps } from './types'

const InitializedMDXEditor: FC<InitializedMDXEditorProps> = ({
  editorRef,
  onKeyDown,
  onPaste,
  toolbarConfig,
  showDiffSourceToggle = false,
  showUndoRedo = false,
  Toolbar = DefaultToolbar,
  ToolbarProps: toolbarOverrideProps,
  ...props
}) => {
  const mergedConfig = useMemo(
    () => ({ ...DEFAULT_TOOLBAR_CONFIG, ...toolbarConfig }),
    [toolbarConfig],
  )

  const toolbarContents = useCallback(
    () => (
      <Toolbar
        config={mergedConfig}
        showDiffSourceToggle={showDiffSourceToggle}
        showUndoRedo={showUndoRedo}
        {...toolbarOverrideProps}
      />
    ),
    [mergedConfig, showDiffSourceToggle, showUndoRedo, Toolbar, toolbarOverrideProps],
  )

  const plugins = useMemo(
    () => [
      codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
      codeMirrorPlugin({
        codeBlockLanguages: CODE_BLOCK_LANGUAGES,
        autoLoadLanguageSupport: true,
      }),
      linkPlugin(),
      linkDialogPlugin({ showLinkTitleField: false }),
      headingsPlugin(),
      imagePlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
      tablePlugin(),
      keyboardCommandsPlugin({ onKeyDown, onPaste }),
      toolbarPlugin({ toolbarContents }),
      markdownShortcutPlugin(),
    ],
    [onKeyDown, onPaste, toolbarContents],
  )

  return (
    <MDXEditor contentEditableClassName="container" plugins={plugins} {...props} ref={editorRef} />
  )
}

export default InitializedMDXEditor
