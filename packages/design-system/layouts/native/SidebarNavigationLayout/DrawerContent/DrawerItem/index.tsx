import { FC } from 'react'

import { usePathname, useRouter } from 'expo-router'
import { Pressable } from 'react-native'

import { Text } from '../../../../../components/native/typographies'
import { useTheme } from '../../../../../providers/native'
import { createStyles } from './styles'
import { DrawerItemProps } from './types'

const DrawerItem: FC<DrawerItemProps> = ({ href, Icon, label }) => {
  const theme = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const isItemActive = pathname === href

  const styles = createStyles(theme, { isActive: isItemActive })

  const handlePress = () => {
    router.push(href)
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Icon isActive={isItemActive} color={theme.colors.object.low} />
      <Text
        variant="subtitle2"
        style={[
          {
            color: isItemActive ? theme.colors.primary.high : theme.colors.object.low,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default DrawerItem
