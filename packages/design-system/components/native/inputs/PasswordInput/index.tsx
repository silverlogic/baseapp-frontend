import { FC, useState } from 'react'

import { useIntl } from 'react-intl'
import { TextInput as PaperTextInput } from 'react-native-paper'

import { withNativeController } from '../../../../utils/native'
import { PureTextInput } from '../TextInput'
import type { TextInputProps } from '../TextInput/types'

const PasswordInput: FC<TextInputProps> = (props) => {
  const intl = useIntl()
  const [hidePassword, setHidePassword] = useState(true)

  const handlePasswordToggle = () => {
    setHidePassword((prevState) => !prevState)
  }

  return (
    <PureTextInput
      label={intl.formatMessage({
        id: 'designSystem.passwordInput.label',
        defaultMessage: 'Password',
      })}
      secureTextEntry={hidePassword}
      right={
        <PaperTextInput.Icon
          icon={hidePassword ? 'eye' : 'eye-off'}
          onPress={handlePasswordToggle}
        />
      }
      {...props}
    />
  )
}

export default withNativeController(PasswordInput)
