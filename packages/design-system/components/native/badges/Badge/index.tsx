import { FC } from 'react'

import { Badge as BadgeComponent } from 'react-native-paper'

import { BadgeProps } from './types'

const Badge: FC<BadgeProps> = ({ children, ...props }) => (
  <BadgeComponent {...props}>{children}</BadgeComponent>
)

export default Badge
