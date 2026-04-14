import type { ClipboardEvent, KeyboardEvent } from 'react'

import { type Realm, lexical, rootEditor$ } from '@mdxeditor/editor'

import { KeyboardCommandsPluginProps } from './types'

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
