import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const FlatPageIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '24',
  height = '24',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" color={svgColor} {...props}>
      <Path
        d="M18 2.2002H5.99995C3.89995 2.2002 2.19995 3.9002 2.19995 6.0002V18.0002C2.19995 20.1002 3.89995 21.8002 5.99995 21.8002H18C20.1 21.8002 21.7999 20.1002 21.7999 18.0002V6.0002C21.7999 3.9002 20.1 2.2002 18 2.2002ZM5.99995 3.7002H18C19.2 3.7002 20.2 4.7002 20.2 5.9002V7.7002H3.69995V6.0002C3.69995 4.8002 4.79995 3.7002 5.99995 3.7002ZM18 20.3002H5.99995C4.79995 20.3002 3.79995 19.3002 3.79995 18.1002V9.3002H20.2999V18.0002C20.2999 19.2002 19.2 20.3002 18 20.3002Z"
        fill="currentColor"
      />
      <Path
        d="M7.09995 13.8002H7.99995C8.39995 13.8002 8.79995 13.5002 8.79995 13.0002C8.79995 12.5002 8.39995 12.2002 7.99995 12.2002H7.09995C6.69995 12.2002 6.29995 12.5002 6.29995 13.0002C6.29995 13.5002 6.59995 13.8002 7.09995 13.8002Z"
        fill="currentColor"
      />
      <Path
        d="M17 12.2002H11C10.6 12.2002 10.2 12.5002 10.2 13.0002C10.2 13.5002 10.5 13.8002 11 13.8002H17C17.4 13.8002 17.8 13.5002 17.8 13.0002C17.8 12.5002 17.4 12.2002 17 12.2002Z"
        fill="currentColor"
      />
      <Path
        d="M7.99995 16.3002H6.99995C6.59995 16.3002 6.19995 16.6002 6.19995 17.1002C6.19995 17.6002 6.49995 17.9002 6.99995 17.9002H7.99995C8.39995 17.9002 8.79995 17.6002 8.79995 17.1002C8.79995 16.6002 8.39995 16.3002 7.99995 16.3002Z"
        fill="currentColor"
      />
      <Path
        d="M17 16.3002H11C10.6 16.3002 10.2 16.6002 10.2 17.1002C10.2 17.6002 10.5 17.9002 11 17.9002H17C17.4 17.9002 17.8 17.6002 17.8 17.1002C17.8 16.6002 17.4 16.3002 17 16.3002Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default FlatPageIcon
