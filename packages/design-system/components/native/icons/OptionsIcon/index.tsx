import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const OptionsIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '25',
  height = '24',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none" color={svgColor} {...props}>
      <G id="Group">
        <G id="Group_2">
          <Path
            id="Path"
            d="M19.8709 14.879C21.1679 16.176 21.0289 18.367 19.4529 19.472C18.4499 20.175 17.0499 20.175 16.0469 19.472C14.4709 18.366 14.3309 16.176 15.6289 14.879C16.7999 13.707 18.6999 13.707 19.8709 14.879"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            id="Path_2"
            d="M19.8711 19.1211L21.7501 21.0001"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            id="Path_3"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.75 10H5.75C4.645 10 3.75 9.105 3.75 8V5C3.75 3.895 4.645 3 5.75 3H8.75C9.855 3 10.75 3.895 10.75 5V8C10.75 9.105 9.855 10 8.75 10Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            id="Path_4"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.75 10H16.75C15.645 10 14.75 9.105 14.75 8V5C14.75 3.895 15.645 3 16.75 3H19.75C20.855 3 21.75 3.895 21.75 5V8C21.75 9.105 20.855 10 19.75 10Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <Path
            id="Path_5"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.75 21H5.75C4.645 21 3.75 20.105 3.75 19V16C3.75 14.895 4.645 14 5.75 14H8.75C9.855 14 10.75 14.895 10.75 16V19C10.75 20.105 9.855 21 8.75 21Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </G>
    </Svg>
  )
}

export default OptionsIcon
