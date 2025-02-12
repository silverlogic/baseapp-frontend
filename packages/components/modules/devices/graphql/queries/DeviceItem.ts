import { graphql } from 'react-relay'

export const DeviceItemFragment = graphql`
  fragment DeviceItemFragment on UserDeviceType {
    id
    ipAddress
    osFamily
    osVersion
    browserFamily
    browserVersion
    deviceFamily
    createdAt
    address
    lastLogin
    isMobile
    isTablet
    isPc
    deviceId
  }
`
