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
        <Path
          d="M12.7906 4.2948L13.725 5.22923C13.8813 5.38551 14.0932 5.47331 14.3143 5.47331H16.4691C17.3895 5.47331 18.1357 6.2195 18.1357 7.13997V14.64C18.1357 15.5604 17.3895 16.3066 16.4691 16.3066H4.80241C3.88193 16.3066 3.13574 15.5604 3.13574 14.64V7.13997C3.13574 6.2195 3.88193 5.47331 4.80241 5.47331H6.95723C7.17825 5.47331 7.3902 5.38551 7.54648 5.22923L8.48092 4.2948C8.79348 3.98224 9.2174 3.80664 9.65943 3.80664H11.6121C12.0541 3.80664 12.478 3.98224 12.7906 4.2948Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Circle
          cx="10.6356"
          cy="10.472"
          r="3.33333"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M15.6776 7.97337C15.6775 7.99636 15.6589 8.01499 15.6359 8.01497C15.6129 8.01496 15.5942 7.99632 15.5942 7.97332C15.5942 7.95032 15.6129 7.93167 15.6359 7.93164C15.6469 7.93163 15.6575 7.93602 15.6654 7.94385C15.6732 7.95168 15.6776 7.9623 15.6776 7.97337"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  )
}

export default CameraIcon
