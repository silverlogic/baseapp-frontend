'use client'

import { FC } from 'react'

import { useFragment } from 'react-relay'

import { DeviceItemFragment } from '../../graphql/queries/DeviceItem'
import Device from './Device'
import { DeviceItemProps } from './types'

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
  const deviceInfo = useFragment(DeviceItemFragment, device)

  return (
    <Device.Root>
      <Device.Icon device={deviceInfo} />
      <Device.Content device={deviceInfo} />
      <Device.Actions device={deviceInfo} />
    </Device.Root>
  )
}

export default DeviceItem
