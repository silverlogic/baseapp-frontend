import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const SendMessageIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '18',
  height = '18',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none" color={svgColor} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.575 3.3C16.2 2.625 15.525 2.25 14.775 2.25H3.525C2.7 2.25 1.95 2.775 1.65 3.6C1.35 4.425 1.5 5.25 2.1 5.85L4.95 8.7L12.15 5.325C12.525 5.175 12.825 5.7 12.45 5.925L5.925 10.275L6.975 14.625C7.2 15.45 7.875 16.05 8.7 16.2C9.525 16.35 10.35 15.9 10.8 15.225L16.575 5.475C16.95 4.8 16.95 3.975 16.575 3.3Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SendMessageIcon
