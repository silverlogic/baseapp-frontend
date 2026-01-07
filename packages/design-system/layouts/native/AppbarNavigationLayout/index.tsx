import React, { FC } from 'react'

import { Slot } from 'expo-router'

import { AppBar } from '../../../components/native/appbars'
import { View } from '../../../components/native/views'
import { styles } from './styles'
import { AppbarNavigationLayoutProps } from './types'

const AppbarNavigationLayout: FC<AppbarNavigationLayoutProps> = ({
  title,
  onBack,
  onNext,
  nextLabel,
  nextIcon,
  onClose,
  closeComponent,
}) => (
  <View style={styles.container} dismissKeyboard>
    <AppBar
      title={title}
      onBack={onBack}
      onClose={onClose}
      closeComponent={closeComponent}
      onNext={onNext}
      nextLabel={nextLabel}
      nextIcon={nextIcon}
    />
    <Slot />
  </View>
)

export default AppbarNavigationLayout
