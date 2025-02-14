import { FC } from 'react'

import type { DrawerHeaderProps } from '@react-navigation/drawer'

import { IconButton } from '../../../../components/native/buttons'
import { MenuIcon } from '../../../../components/native/icons'
import { View } from '../../../../components/native/views'
import { styles } from './styles'

const Header: FC<DrawerHeaderProps> = ({ navigation }) => (
  <View style={styles.container}>
    <IconButton onPress={navigation.toggleDrawer}>
      <MenuIcon />
    </IconButton>
    <View />
  </View>
)

export default Header
