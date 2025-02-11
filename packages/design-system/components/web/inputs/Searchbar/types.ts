import type { NonUndefined } from 'react-hook-form'

import type { TextFieldProps } from '../TextField/types'

export type SearchbarProps = Omit<TextFieldProps, 'onChange'> & {
  isPending: boolean
  onClear?: () => void
  onChange: NonUndefined<TextFieldProps['onChange']>
}
