import { FormControl } from '@baseapp-frontend/utils'

import Quill from 'quill'

export type RichTextEditorProps = FormControl & {
  key?: string
  autoFocus?: boolean
  inputRef?: React.Ref<Quill | null>
  name?: string
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  placeholder?: string
  value: string
}
