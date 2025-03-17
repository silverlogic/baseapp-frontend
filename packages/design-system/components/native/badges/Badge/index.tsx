import { FC } from 'react'

import { Badge as BadgeComponent } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { createStyles } from './styles'
import { BadgeProps } from './types'

const Badge: FC<BadgeProps> = ({ children, ...props }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <BadgeComponent style={styles.badge} {...props}>
      {children}
    </BadgeComponent>
  )
}

export default Badge
