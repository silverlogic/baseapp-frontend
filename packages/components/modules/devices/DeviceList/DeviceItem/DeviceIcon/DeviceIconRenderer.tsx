import { FC } from 'react'

import AppleComputerIcon from './devicesIcons/computers/AppleComputerIcon'
import LinuxComputerIcon from './devicesIcons/computers/LinuxComputerIcon'
import UnknownComputerIcon from './devicesIcons/computers/UnknownComputerIcon'
import WindowsComputerIcon from './devicesIcons/computers/WindowsComputerIcon'
import AndroidPhoneIcon from './devicesIcons/phones/AndroidPhone'
import ApplePhoneIcon from './devicesIcons/phones/ApplePhone'
import UnknownPhoneIcon from './devicesIcons/phones/UnknownPhone'
import AndroidTabletIcon from './devicesIcons/tablets/AndroidTablet'
import AppleTabletIcon from './devicesIcons/tablets/AppleTablet'
import UnknownTabletIcon from './devicesIcons/tablets/UnknownTablet'
import { DeviceIconProps } from './types'

const DeviceIconRenderer: FC<DeviceIconProps> = ({ device }) => {
  if (device?.isPc) {
    if (device?.osFamily?.toLowerCase().includes('windows')) {
      return <WindowsComputerIcon />
    }
    if (device?.osFamily?.toLowerCase().includes('mac')) {
      return <AppleComputerIcon />
    }
    if (device?.osFamily?.toLowerCase().includes('linux')) {
      return <LinuxComputerIcon />
    }
    return <UnknownComputerIcon />
  }

  if (device?.isMobile) {
    if (device?.osFamily?.toLowerCase().includes('ios')) {
      return <ApplePhoneIcon />
    }
    if (device?.osFamily?.toLowerCase().includes('android')) {
      return <AndroidPhoneIcon />
    }
    return <UnknownPhoneIcon />
  }

  if (device?.isTablet) {
    if (device?.osFamily?.toLowerCase().includes('ios')) {
      return <AppleTabletIcon />
    }
    if (device?.osFamily?.toLowerCase().includes('android')) {
      return <AndroidTabletIcon />
    }
    return <UnknownTabletIcon />
  }

  return <UnknownComputerIcon />
}

export default DeviceIconRenderer
