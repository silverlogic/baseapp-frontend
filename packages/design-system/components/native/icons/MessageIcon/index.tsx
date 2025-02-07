import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const MessageIcon: FC<SvgIconProps> = ({
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
      <G>
        <Path
          d="M12.0002 2.19922C7.2002 2.19922 3.2002 5.89922 3.2002 10.3992C3.2002 14.6992 6.1002 18.0992 10.2002 18.5992V20.9992C10.2002 21.2992 10.3002 21.4992 10.5002 21.5992C10.6002 21.6992 10.8002 21.6992 10.9002 21.6992C11.0002 21.6992 11.1002 21.6992 11.2002 21.5992C14.7002 19.9992 20.6002 16.3992 20.6002 10.3992C20.8002 5.89922 16.8002 2.19922 12.0002 2.19922ZM11.8002 19.7992V17.9992C11.8002 17.5992 11.5002 17.2992 11.1002 17.2992C7.5002 17.0992 4.8002 14.2992 4.8002 10.4992C4.8002 6.79922 8.0002 3.79922 12.0002 3.79922C16.0002 3.79922 19.2002 6.79922 19.2002 10.4992C19.2002 15.0992 14.9002 18.1992 11.8002 19.7992Z"
          fill="currentColor"
        />
      </G>
    </Svg>
  )
}

export default MessageIcon
