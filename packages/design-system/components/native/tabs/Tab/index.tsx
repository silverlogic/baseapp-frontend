import React, { FC } from 'react'

import { useTheme } from '../../../../providers/native'
import { Button } from '../../buttons'
import { Text } from '../../typographies'
import { View } from '../../views'
import { createStyles } from './styles'
import { TabProps } from './types'

const Tabs: FC<TabProps> = ({
  onChange = () => {},
  currentValue,
  value,
  label,
  selectedColor = 'high',
  unselectedColor = 'low',
}) => {
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

export default Tabs
