import React, { FC } from 'react'

import { useTheme } from '../../../../providers/native'
import { View } from '../../views'
import { TabProps } from '../Tab/types'
import { createStyles } from './styles'
import { TabsProps } from './types'

const Tabs: FC<TabsProps> = ({ onChange, value, children, style, ...props }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<TabProps>, {
          onChange,
          currentValue: value,
        })
      }
      return null
    })

  return (
    <View style={[styles.baseTabsContainer, style]} {...props}>
      {renderChildren()}
    </View>
  )
}

export default Tabs
