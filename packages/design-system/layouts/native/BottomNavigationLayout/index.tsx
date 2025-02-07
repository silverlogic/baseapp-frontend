import React, { FC } from 'react'

import { usePathname } from 'expo-router'
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui'

import { Text } from '../../../components/native/typographies'
import { useTheme } from '../../../providers/native'
import { createStyles } from './styles'
import { BottomNavigationLayoutProps } from './types'

const BottomNavigationLayout: FC<BottomNavigationLayoutProps> = ({ tabs }) => {
  const pathname = usePathname()

  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <Tabs>
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
