import { FC } from 'react'

import Svg, { G, Path, Rect } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const FlowerIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '21',
  height = '21',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none" color={svgColor} {...props}>
      <G id="Group">
        <Path
          id="Path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6356 6.86221L8.55225 6.30664V7.97331C8.55225 9.1239 9.48499 10.0566 10.6356 10.0566V10.0566C11.1881 10.0566 11.718 9.83715 12.1087 9.44645C12.4994 9.05575 12.7189 8.52584 12.7189 7.97331V6.30664L10.6356 6.86221Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Path_2"
          d="M14.8024 11.3066C14.8024 13.6078 12.9369 15.4733 10.6357 15.4733"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Path_3"
          d="M10.6942 15.4147C10.2793 12.7309 12.1186 10.8916 14.8024 11.3065"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Path_4"
          d="M6.46924 11.3065C9.15302 10.8916 10.9923 12.7309 10.5775 15.4147"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Path_5"
          d="M10.6359 15.4733C8.33472 15.4733 6.46924 13.6078 6.46924 11.3066"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          id="Rectangle"
          x="2.71924"
          y="2.55664"
          width="15.8333"
          height="15.8333"
          rx="5.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default FlowerIcon
