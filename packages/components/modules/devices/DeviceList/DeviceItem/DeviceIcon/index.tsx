import { FC } from 'react'

import DeviceIconRenderer from './DeviceIconRenderer'
import { DeviceIconContainer } from './styled'
import { DeviceIconProps } from './types'

const DeviceIcon: FC<DeviceIconProps> = ({ device }) => (
  <DeviceIconContainer>
    <DeviceIconRenderer device={device} />
  </DeviceIconContainer>
)

export default DeviceIcon
