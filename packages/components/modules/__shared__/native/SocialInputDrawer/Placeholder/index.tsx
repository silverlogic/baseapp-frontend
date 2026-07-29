import { FC } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

import { PlaceholderProps } from './types'

const Placeholder: FC<PlaceholderProps> = ({
  handleHeight = 38,
  keyboardHeight = 0,
  layoutOverheadHeight = 88,
  showHandle,
  textHeight = 0,
}) => (
  <View
    style={{
      height: textHeight + (showHandle ? handleHeight : 0) + layoutOverheadHeight + keyboardHeight,
    }}
  />
)

export default Placeholder
