import React, { FC, useCallback } from 'react'

import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import Drawer from 'expo-router/drawer'

import DefaultDrawerContent from './DrawerContent'
import DefaultHeader from './Header'
import { SidebarNavigationLayoutProps } from './types'

const SidebarNavigationLayout: FC<SidebarNavigationLayoutProps> = ({
  DrawerContent = DefaultDrawerContent,
  DrawerContentProps,
  Header = DefaultHeader,
  DrawerProps = {},
}) => {
  const renderDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => <DrawerContent {...DrawerContentProps} {...props} />,
    [DrawerContent, DrawerContentProps],
  )

  return (
    <Drawer
      // @ts-ignore TODO: double check this lint issue
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
        swipeEdgeWidth: 60,
        header: Header,
      }}
      drawerContent={renderDrawerContent}
      {...DrawerProps}
    />
  )
}

export default SidebarNavigationLayout
