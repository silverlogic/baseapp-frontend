import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { Textarea } from './styled'
import { TextareaFieldProps } from './types'

const TextareaField: FC<TextareaFieldProps> = (props) => (
  <Textarea multiline maxRows={3} hideBorder {...props} />
)

export default withController(TextareaField)
