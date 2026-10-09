'use client'

import { FC, useCallback, useMemo } from 'react'

import {
  MDXEditor,
  type Translation,
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
import { useIntl } from 'react-intl'

import DefaultToolbar from '../Toolbar'
import { CODE_BLOCK_LANGUAGES, DEFAULT_TOOLBAR_CONFIG, MDX_EDITOR_MESSAGES } from '../constants'
import { keyboardCommandsPlugin } from './plugins/keyboard-commands'
import { mentionsPlugin } from './plugins/mentions'
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
  mentions,
  ...props
}) => {
  const intl = useIntl()

  const translation = useCallback<Translation>(
    (key, defaultValue, interpolations = {}) => {
      const message = MDX_EDITOR_MESSAGES[key as keyof typeof MDX_EDITOR_MESSAGES]
      if (message) return intl.formatMessage(message, interpolations)
      return Object.entries(interpolations).reduce(
        (value, [name, arg]) => value.replaceAll(`{{${name}}}`, String(arg as string | number)),
        defaultValue,
      )
    },
    [intl],
  )

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
      ...(mentions ? [mentionsPlugin(mentions)] : []),
    ],
    [onKeyDown, onPaste, toolbarContents, mentions],
  )

  return (
    <MDXEditor
      contentEditableClassName="container"
      plugins={plugins}
      translation={translation}
      {...props}
      ref={editorRef}
    />
  )
}

export default InitializedMDXEditor
