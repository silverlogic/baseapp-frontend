import { FC } from 'react'

import { SendMessageIcon as DefaultSendMessageIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from '@gorhom/bottom-sheet'

import { SubmitActionsProps } from './types'

const SubmitActions: FC<SubmitActionsProps> = ({
  disabled = false,
  handleSubmit,
  SendMessageIcon = DefaultSendMessageIcon,
  SendMessageIconProps = {},
}) => {
  const theme = useTheme()
  return (
    <TouchableOpacity onPress={handleSubmit} style={{ padding: 8 }}>
      <SendMessageIcon
        color={disabled ? theme.colors.object.disabled : theme.colors.primary.main}
        {...SendMessageIconProps}
      />
    </TouchableOpacity>
  )
}

export default SubmitActions
