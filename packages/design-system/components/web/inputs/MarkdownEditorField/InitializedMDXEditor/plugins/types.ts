import { ClipboardEventHandler, KeyboardEventHandler } from 'react'

export interface KeyboardCommandsPluginProps {
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>
}
