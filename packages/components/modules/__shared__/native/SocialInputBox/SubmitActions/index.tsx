import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { SendMessageIcon as DefaultSendMessageIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from '@gorhom/bottom-sheet'

import { SubmitActionsProps } from './types'

const SubmitActions: FC<SubmitActionsProps> = ({
  disabled = false,
  handleSubmit,
  SendMessageIcon = DefaultSendMessageIcon,
  SendMessageIconProps = {},
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const theme = useTheme()
  const content = (
    <SendMessageIcon
      color={disabled ? theme.colors.object.disabled : theme.colors.primary.main}
      {...SendMessageIconProps}
    />
  )

  if (shouldUseBottomSheetSafeComponents) {
    return (
      <TouchableOpacity disabled={disabled} onPress={handleSubmit} style={{ padding: 8 }}>
        {content}
      </TouchableOpacity>
    )
  }
  return (
    <IconButton disabled={disabled} onPress={handleSubmit}>
      {content}
    </IconButton>
  )
}

export default SubmitActions
