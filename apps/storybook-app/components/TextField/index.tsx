import { IControlledComponentProps } from '@baseapp-frontend/core'
import { TextField } from '@baseapp-frontend/design-system-mui'

export const TextFieldComponent = ({ ...props }: IControlledComponentProps) => (
  <TextField {...props} />
)
