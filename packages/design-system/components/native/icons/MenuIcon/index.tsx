import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const MenuIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '20',
  height = '20',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" color={svgColor} {...props}>
      <G>
        <G>
          <Path
            d="M17.4999 4.33301H2.49992C2.16659 4.33301 1.83325 4.66634 1.83325 4.99967C1.83325 5.33301 2.16659 5.58301 2.49992 5.58301H17.4999C17.8333 5.58301 18.1666 5.33301 18.1666 4.91634C18.1666 4.49967 17.8333 4.33301 17.4999 4.33301Z"
            fill="currentColor"
          />
          <Path
            d="M14.1666 9.33301H2.49992C2.16659 9.33301 1.83325 9.58301 1.83325 9.99967C1.83325 10.4163 2.08325 10.6663 2.49992 10.6663H14.1666C14.4999 10.6663 14.8333 10.4163 14.8333 9.99967C14.8333 9.58301 14.4999 9.33301 14.1666 9.33301Z"
            fill="currentColor"
          />
          <Path
            d="M10.8333 14.4163H2.49992C2.16659 14.4163 1.83325 14.6663 1.83325 15.083C1.83325 15.4997 2.08325 15.7497 2.49992 15.7497H10.8333C11.1666 15.7497 11.4999 15.4997 11.4999 15.083C11.4999 14.6663 11.1666 14.4163 10.8333 14.4163Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  )
}

export default MenuIcon
