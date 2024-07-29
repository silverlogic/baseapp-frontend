import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { TextFieldProps } from '../TextField/types'
import { Textarea } from './styled'

const TextareaField: FC<TextFieldProps> = (props) => <Textarea multiline maxRows={3} {...props} />

export default withController(TextareaField)
