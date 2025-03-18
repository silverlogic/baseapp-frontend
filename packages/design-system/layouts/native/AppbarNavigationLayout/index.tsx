import React, { FC } from 'react'

import { Slot } from 'expo-router'

import { AppBar } from '../../../components/native/appbars'
import { View } from '../../../components/native/views'
import { styles } from './styles'
import { AppbarNavigationLayoutProps } from './types'

const AppbarNavigationLayout: FC<AppbarNavigationLayoutProps> = ({ title, onBack, onClose }) => (
  <View style={styles.container} dismissKeyboard>
    <AppBar title={title} onBack={onBack} onClose={onClose} />
    <Slot />
  </View>
)

export default AppbarNavigationLayout
