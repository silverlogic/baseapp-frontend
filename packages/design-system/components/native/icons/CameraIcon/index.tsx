import { FC } from 'react'

import Svg, { Circle, G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const CameraIcon: FC<SvgIconProps> = ({
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
            d="M12.7906 4.29285L13.725 5.22728C13.8813 5.38356 14.0932 5.47135 14.3143 5.47135H16.4691C17.3896 5.47135 18.1357 6.21755 18.1357 7.13802V14.638C18.1357 15.5585 17.3896 16.3047 16.4691 16.3047H4.80241C3.88193 16.3047 3.13574 15.5585 3.13574 14.638V7.13802C3.13574 6.21755 3.88193 5.47135 4.80241 5.47135H6.95723C7.17825 5.47135 7.3902 5.38356 7.54648 5.22728L8.48092 4.29285C8.79348 3.98028 9.2174 3.80469 9.65943 3.80469H11.6121C12.0541 3.80469 12.478 3.98028 12.7906 4.29285Z"
            fill="currentColor"
          />
          <Circle cx="10.6356" cy="10.4701" r="3.33333" fill={colors.object.disabled} />
        </G>
      </G>
    </Svg>
  )
}

export default CameraIcon
