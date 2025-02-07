import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const EditIcon: FC<SvgIconProps> = ({
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
            d="M18.0905 4.50287L16.2572 2.66954C16.0072 2.41954 15.5905 2.25287 15.2572 2.25287C14.8405 2.25287 14.5072 2.41954 14.2572 2.66954L3.09049 13.7529C2.84049 14.0029 2.67383 14.4195 2.67383 14.7529V17.5029C2.67383 17.8362 2.92383 18.1695 3.34049 18.1695H6.0905C6.50716 18.1695 6.84049 18.0029 7.09049 17.7529L18.0905 6.5862C18.3405 6.3362 18.5072 5.91954 18.5072 5.5862C18.5072 5.25287 18.4238 4.8362 18.0905 4.50287ZM6.0905 16.8362C6.0905 16.8362 6.00716 16.9195 5.92383 16.9195H3.92383V14.8362C3.92383 14.7529 3.92383 14.7529 4.00716 14.6695L12.3405 6.25287L14.5072 8.41954L6.0905 16.8362ZM17.2572 5.66954L15.4238 7.50287L13.2572 5.3362L15.0905 3.50287C15.1738 3.41954 15.1738 3.41954 15.2572 3.41954C15.2572 3.41954 15.3405 3.41954 15.4238 3.50287L17.3405 5.41954C17.4238 5.50287 17.4238 5.50287 17.4238 5.5862C17.2572 5.5862 17.2572 5.66954 17.2572 5.66954Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  )
}

export default EditIcon
