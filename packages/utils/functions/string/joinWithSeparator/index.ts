import compact from 'lodash/compact'
import join from 'lodash/join'

import { JoinWithSeparatorOptions } from './types'

export const joinWithSeparator = (
  list: any[] = [],
  { separator = ' ', fallback }: JoinWithSeparatorOptions = {},
) => {
  const string = join(compact(list), separator)

  return string || fallback || ''
}
