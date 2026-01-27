import React from 'react'

import { FabButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'

import { NewChatButtonProps } from './types'

const NewChatButton: React.FC<NewChatButtonProps> = ({ isGroup }) => {
  const theme = useTheme()
  const router = useRouter()

  const navigateToCreateRoom = () =>
    isGroup ? router.push('/create-group') : router.push('/create-room')

  return (
    <FabButton
      onPress={navigateToCreateRoom}
      iconName="add"
      iconSize={28}
      iconColor={theme.colors.primary.contrast}
    />
  )
}

export { NewChatButton }
