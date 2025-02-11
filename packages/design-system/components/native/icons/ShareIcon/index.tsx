import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const ShareIcon: FC<SvgIconProps> = ({
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
            d="M17.0087 8.41968L4.9254 2.83634C4.34207 2.58634 3.59207 2.66968 3.09207 3.16968C2.59207 3.58634 2.4254 4.33634 2.6754 5.00301L4.4254 10.003L2.6754 15.003C2.4254 15.6697 2.59207 16.4197 3.09207 16.8363C3.4254 17.1697 3.84207 17.253 4.25874 17.253C4.50874 17.253 4.75874 17.1697 5.00874 17.0863L17.0087 11.503C17.5921 11.253 18.0087 10.5863 18.0087 9.91968C18.0087 9.33634 17.5921 8.75301 17.0087 8.41968ZM3.84207 4.58634C3.75874 4.33634 3.9254 4.16968 3.9254 4.08634C4.00874 4.00301 4.09207 4.00301 4.1754 4.00301C4.25874 4.00301 4.25874 4.00301 4.34207 4.08634L15.9254 9.41968H5.50874L3.84207 4.58634ZM4.4254 16.003C4.1754 16.0863 4.00874 16.003 3.9254 15.9197C3.84207 15.8363 3.6754 15.6697 3.84207 15.4197L5.59207 10.5863H16.0921L4.4254 16.003Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  )
}

export default ShareIcon
