import React, { FC, useLayoutEffect } from 'react'

import { useNavigation, usePathname } from 'expo-router'
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui'

import { Text } from '../../../components/native/typographies'
import { useTheme } from '../../../providers/native'
import { createStyles } from './styles'
import { BottomNavigationLayoutProps } from './types'

const BottomNavigationLayout: FC<BottomNavigationLayoutProps> = ({ tabs, routesWithoutHeader }) => {
  const navigation = useNavigation()
  const pathname = usePathname()
  const theme = useTheme()
  const styles = createStyles(theme)

  const isPathnameInTabs = tabs.some(({ href }) => href === pathname)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: !routesWithoutHeader?.includes(pathname) && isPathnameInTabs,
      swipeEnabled: !routesWithoutHeader?.includes(pathname) && isPathnameInTabs,
    })
  }, [navigation, pathname, isPathnameInTabs, routesWithoutHeader])

  return (
    <Tabs options={{ backBehavior: 'history' }}>
      <TabSlot />
      <TabList style={styles.tabList}>
        {tabs.map(({ href, label, name, Icon }) => {
          const isTabActive = pathname === href
          return (
            <TabTrigger key={name} name={name} href={href} style={styles.tab}>
              {Icon && <Icon isActive={isTabActive} />}
              {label && (
                <Text
                  variant="caption"
                  style={[
                    styles.tabText,
                    {
                      color: isTabActive ? theme.colors.primary.high : theme.colors.object.high,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </TabTrigger>
          )
        })}
      </TabList>
    </Tabs>
  )
}

export default BottomNavigationLayout
