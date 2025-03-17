import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const LockIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '16',
  height = '18',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 16 18" color={svgColor} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.708008 9.92644C0.708008 8.06967 2.21322 6.56445 4.07 6.56445H13.0353C14.8921 6.56445 16.3973 8.06967 16.3973 9.92644V14.4091C16.3973 16.2659 14.8921 17.7711 13.0353 17.7711H4.07C2.21322 17.7711 0.708008 16.2659 0.708008 14.4091V9.92644ZM4.07 7.90925C2.95593 7.90925 2.0528 8.81238 2.0528 9.92644V14.4091C2.0528 15.5232 2.95593 16.4263 4.07 16.4263H13.0353C14.1494 16.4263 15.0525 15.5232 15.0525 14.4091V9.92644C15.0525 8.81238 14.1494 7.90925 13.0353 7.90925H4.07Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.1042 1.63386C6.74257 1.63386 5.63874 2.73768 5.63874 4.09932V7.23718C5.63874 7.60853 5.3377 7.90958 4.96634 7.90958C4.59499 7.90958 4.29395 7.60853 4.29395 7.23718V4.09932C4.29395 1.99497 5.99986 0.289062 8.1042 0.289062H9.00073C11.1051 0.289062 12.811 1.99497 12.811 4.09932V7.23718C12.811 7.60853 12.5099 7.90958 12.1386 7.90958C11.7672 7.90958 11.4662 7.60853 11.4662 7.23718V4.09932C11.4662 2.73768 10.3624 1.63386 9.00073 1.63386H8.1042Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.19043 12.6158C5.19043 12.2444 5.49147 11.9434 5.86283 11.9434H11.242C11.6134 11.9434 11.9144 12.2444 11.9144 12.6158C11.9144 12.9871 11.6134 13.2882 11.242 13.2882H5.86283C5.49147 13.2882 5.19043 12.9871 5.19043 12.6158Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default LockIcon
