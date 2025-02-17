import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const NotificationBellIcon: FC<SvgIconProps> = ({
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
        <G>
          <Path
            d="M9.70801 18.344V18.709C9.70801 19.974 10.734 21 12 21V21C13.266 21 14.292 19.974 14.292 18.708V18.343"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M13.833 5.751V4.833C13.833 3.821 13.013 3 12 3V3C10.987 3 10.167 3.821 10.167 4.833V5.751"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.563 10.188V10.188C6.563 7.685 8.592 5.657 11.094 5.657H12.907C15.41 5.657 17.438 7.686 17.438 10.188V10.188V12.985C17.438 13.515 17.649 14.024 18.024 14.399L18.665 15.04C19.04 15.415 19.251 15.924 19.251 16.454V16.454C19.251 17.498 18.405 18.344 17.361 18.344H6.64C5.596 18.344 4.75 17.498 4.75 16.454V16.454C4.75 15.924 4.961 15.415 5.336 15.04L5.977 14.399C6.352 14.024 6.563 13.515 6.563 12.985V10.188Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  )
}

export default NotificationBellIcon
