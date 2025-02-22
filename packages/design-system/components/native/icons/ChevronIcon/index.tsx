import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { ChevronIconProps, RotateRecord } from './types'

const ChevronIcon: FC<ChevronIconProps> = ({
  isActive = false,
  color,
  width = '24',
  height = '25',
  direction = 'left',
  style,
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.low
  const svgColor = isActive ? colors.primary.high : defaultColor

  const rotateDeg: RotateRecord = {
    right: '180deg',
    left: '0deg',
    down: '270deg',
    up: '90deg',
  }

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      color={svgColor}
      style={[{ transform: [{ rotate: rotateDeg[direction] }] }, style]}
      {...props}
    >
      <Path
        d="M13.8297 19.6146C13.5271 19.6156 13.2403 19.4795 13.0497 19.2446L8.21968 13.2446C7.91636 12.8756 7.91636 12.3436 8.21968 11.9746L13.2197 5.97456C13.5731 5.5493 14.2044 5.49109 14.6297 5.84456C15.0549 6.19802 15.1131 6.8293 14.7597 7.25456L10.2897 12.6146L14.6097 17.9746C14.8594 18.2743 14.912 18.6918 14.7444 19.0441C14.5769 19.3964 14.2198 19.6191 13.8297 19.6146Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ChevronIcon
