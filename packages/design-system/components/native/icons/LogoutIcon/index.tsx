import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const LogoutIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '18',
  height = '17',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 18 17" color={svgColor} fill="none" {...props}>
      <Path
        d="M9.83333 8.61589H1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.41667 5.69922L1.5 8.61589L4.41667 11.5326"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 1.11523C13.1421 1.11523 16.5 4.4731 16.5 8.61523C16.5 12.7574 13.1421 16.1152 9 16.1152"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LogoutIcon
