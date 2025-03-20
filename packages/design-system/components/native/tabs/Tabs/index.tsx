import React, { FC, useMemo } from 'react'

import { useTheme } from '../../../../providers/native'
import { View } from '../../views'
import { TabsContext } from './context'
import { createStyles } from './styles'
import { TabsProps } from './types'

const Tabs: FC<TabsProps> = ({ onChange, value, children, style, ...props }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const memoizedContextValue = useMemo(() => ({ currentValue: value, onChange }), [value, onChange])

  return (
    <TabsContext.Provider value={memoizedContextValue}>
      <View style={[styles.baseTabsContainer, style]} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  )
}

export default Tabs
