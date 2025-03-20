import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const KeyIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '16',
  height = '8',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 16 8" fill="none" color={svgColor} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.37012 4.09908C6.37012 3.71105 6.68468 3.39648 7.07271 3.39648H14.7778C15.1659 3.39648 15.4804 3.71105 15.4804 4.09908C15.4804 4.48711 15.1659 4.80167 14.7778 4.80167H7.07271C6.68468 4.80167 6.37012 4.48711 6.37012 4.09908Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7778 3.39648C15.1658 3.39648 15.4804 3.71105 15.4804 4.09908V6.81578C15.4804 7.20381 15.1658 7.51837 14.7778 7.51837C14.3898 7.51837 14.0752 7.20381 14.0752 6.81578V4.09908C14.0752 3.71105 14.3898 3.39648 14.7778 3.39648Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6557 3.39648C12.0438 3.39648 12.3583 3.71105 12.3583 4.09908V6.81578C12.3583 7.20381 12.0438 7.51837 11.6557 7.51837C11.2677 7.51837 10.9531 7.20381 10.9531 6.81578V4.09908C10.9531 3.71105 11.2677 3.39648 11.6557 3.39648Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.64653 2.35152C4.68163 1.38662 3.1172 1.38662 2.1523 2.35152C1.1874 3.31642 1.1874 4.88084 2.1523 5.84575C3.1172 6.81065 4.68163 6.81065 5.64653 5.84575C6.61143 4.88084 6.61143 3.31642 5.64653 2.35152ZM6.64015 1.3579C5.12648 -0.155759 2.67235 -0.155759 1.15868 1.3579C-0.354978 2.87157 -0.354978 5.3257 1.15868 6.83936C2.67235 8.35303 5.12648 8.35303 6.64015 6.83936C8.15381 5.3257 8.15381 2.87157 6.64015 1.3579Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default KeyIcon
