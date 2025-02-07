import { FC, useState } from 'react'

import { TextInput as PaperTextInput } from 'react-native-paper'

import { withNativeController } from '../../../../utils/native'
import { PureTextInput } from '../TextInput'
import type { TextInputProps } from '../TextInput/types'

const PasswordInput: FC<TextInputProps> = (props) => {
  const [hidePassword, setHidePassword] = useState(true)

  const handlePasswordToggle = () => {
    setHidePassword((prevState) => !prevState)
  }

  return (
    <PureTextInput
      label="Password"
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
