import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const FavoriteSelectedIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '18',
  height = '18',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.error.main
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" color={svgColor} fill="none" {...props}>
      <Path
        d="M9.00039 15.5999C7.50039 15.5999 1.65039 12.0749 1.65039 7.34985C1.65039 5.02485 3.45039 2.47485 6.22539 2.47485C7.50039 2.47485 8.40039 2.99985 9.00039 3.52485C9.60039 2.99985 10.5004 2.47485 11.7754 2.47485C14.4754 2.47485 16.3504 5.02485 16.3504 7.34985C16.3504 12.0749 10.5004 15.5999 9.00039 15.5999Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default FavoriteSelectedIcon
