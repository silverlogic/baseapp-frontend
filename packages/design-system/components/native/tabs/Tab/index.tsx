import React, { FC } from 'react'

import { useTheme } from '../../../../providers/native'
import { Button } from '../../buttons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { useTabsContext } from '../Tabs/context'
import { createStyles } from './styles'
import { TabProps } from './types'

const Tab: FC<TabProps> = ({ value, label, selectedColor = 'high', unselectedColor = 'low' }) => {
  const { currentValue, onChange } = useTabsContext()
  const isSelected = value === currentValue
  const theme = useTheme()
  const styles = createStyles(theme, isSelected)

  return (
    <View style={styles.baseTabContainer}>
      <Button mode="text" onPress={() => onChange(value)}>
        <Text variant="subtitle2" color={isSelected ? selectedColor : unselectedColor}>
          {label}
        </Text>
      </Button>
    </View>
  )
}

export default Tab
