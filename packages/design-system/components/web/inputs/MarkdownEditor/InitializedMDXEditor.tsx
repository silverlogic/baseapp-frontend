'use client'

import type { ClipboardEvent, ForwardedRef, KeyboardEvent } from 'react'

import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  type MDXEditorMethods,
  type Realm,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  lexical,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  rootEditor$,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'

import { InitializedMDXEditorProps, KeyboardCommandsPluginProps } from './types'

export function keyboardCommandsPlugin({ onKeyDown, onPaste }: KeyboardCommandsPluginProps) {
  return {
    init(realm: Realm) {
      realm.sub(rootEditor$, (editor): void | (() => void) => {
        if (!editor) return () => {}

        const unregisterKeyDown =
          onKeyDown &&
          editor.registerCommand(
            lexical.KEY_DOWN_COMMAND,
            (event: KeyboardEvent<HTMLTextAreaElement>) => {
              onKeyDown(event)
              return false
            },
            lexical.COMMAND_PRIORITY_EDITOR,
          )

        const unregisterPaste =
          onPaste &&
          editor.registerCommand(
            lexical.PASTE_COMMAND,
            (event: ClipboardEvent<HTMLTextAreaElement>) => {
              onPaste(event)
              return false
            },
            lexical.COMMAND_PRIORITY_EDITOR,
          )

        return () => {
          unregisterKeyDown?.()
          unregisterPaste?.()
        }
      })
    },
  }
}

export default function InitializedMDXEditor({
  editorRef,
  onKeyDown,
  onPaste,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & InitializedMDXEditorProps) {
  return (
    <MDXEditor
      contentEditableClassName="container"
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            txt: 'txt',
            sql: 'sql',
            html: 'html',
            sass: 'sass',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            ts: 'typescript',
            '': 'unspecified',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)',
          },
          autoLoadLanguageSupport: true,
        }),
        linkPlugin(),
        linkDialogPlugin(),
        headingsPlugin(),
        imagePlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        tablePlugin(),
        keyboardCommandsPlugin({ onKeyDown, onPaste }),
        toolbarPlugin({
          // eslint-disable-next-line react/no-unstable-nested-components
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <Separator />
              <InsertTable />
              <Separator />
              <InsertCodeBlock />
              <Separator />
              <ListsToggle />
              <Separator />
              <CodeToggle />
              <Separator />
              <InsertImage />
              <Separator />
              <InsertThematicBreak />
              <Separator />
              <CreateLink />
              <Separator />
              <DiffSourceToggleWrapper>
                <UndoRedo />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  )
}
