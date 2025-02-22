import { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const ProfileSettingsIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '16',
  height = '17',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" color={svgColor} fill="none" {...props}>
      <Rect
        x="4.66675"
        y="1.11523"
        width={Number(width) / 2.5}
        height={Number(height) / 2.5}
        rx="3.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6667 16.115V14.0911C14.6667 12.2502 13.1743 10.7578 11.3334 10.7578H4.66671C2.82576 10.7578 1.33337 12.2502 1.33337 14.0911V16.115"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ProfileSettingsIcon
