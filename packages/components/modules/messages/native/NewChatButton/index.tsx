import React from 'react'

import { FabButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useRouter } from 'expo-router'

const NewChatButton = () => {
  const theme = useTheme()
  const router = useRouter()

  const navigateToCreateRoom = () => router.push('/create-room')

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
