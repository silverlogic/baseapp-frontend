import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const HomeIcon: FC<SvgIconProps> = ({
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
    <Svg width={width} height={height} viewBox="0 0 25 24" color={svgColor} {...props}>
      <G>
        <G>
          <Path
            d="M20.9668 7.7L14.9668 3C13.5668 2 11.7668 2 10.3668 3L4.3668 7.7C3.4668 8.4 2.9668 9.5 2.9668 10.7V18C2.9668 20.1 4.6668 21.8 6.7668 21.8H18.7668C20.8668 21.8 22.5668 20.1 22.5668 18V10.7C22.4668 9.5 21.8668 8.4 20.9668 7.7ZM20.8668 18C20.8668 19.2 19.8668 20.2 18.6668 20.2H6.6668C5.4668 20.2 4.4668 19.2 4.4668 18V10.7C4.4668 10 4.7668 9.4 5.3668 8.9L11.3668 4.2C11.6668 3.9 12.1668 3.7 12.6668 3.7C13.1668 3.7 13.6668 3.9 14.0668 4.2L20.0668 8.9C20.6668 9.3 20.9668 10 20.9668 10.7V18H20.8668Z"
            fill="currentColor"
          />
          <Path
            d="M15.6668 16.2H9.6668C9.2668 16.2 8.8668 16.5 8.8668 17C8.8668 17.5 9.1668 17.8 9.6668 17.8H15.6668C16.0668 17.8 16.4668 17.5 16.4668 17C16.4668 16.5 16.0668 16.2 15.6668 16.2Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  )
}

export default HomeIcon
