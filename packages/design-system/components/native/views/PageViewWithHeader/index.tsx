import { FC } from 'react'

import View from '../View'
import { styles } from './styles'
import type { PageViewWithHeaderProps } from './types'

const PageViewWithHeader: FC<PageViewWithHeaderProps> = ({ style, ...props }) => (
  <View style={[styles.container, style]} {...props} />
)

export default PageViewWithHeader
