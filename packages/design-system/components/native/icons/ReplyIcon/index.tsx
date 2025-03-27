import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const ReplyIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '18',
  height = '18',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.low
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" color={svgColor} fill="none" {...props}>
      <Path
        d="M11.6245 10.3501H6.37454C6.07454 10.3501 5.77454 10.5751 5.77454 10.9501C5.77454 11.3251 5.99954 11.5501 6.37454 11.5501H11.6245C11.9245 11.5501 12.2245 11.3251 12.2245 10.9501C12.2245 10.5751 11.9245 10.3501 11.6245 10.3501Z"
        fill="currentColor"
      />
      <Path
        d="M11.6245 7.35015H6.37454C6.07454 7.35015 5.77454 7.57515 5.77454 7.95015C5.77454 8.32515 5.99954 8.55015 6.37454 8.55015H11.6245C11.9245 8.55015 12.2245 8.32515 12.2245 7.95015C12.2245 7.57515 11.9245 7.35015 11.6245 7.35015Z"
        fill="currentColor"
      />
      <Path
        d="M8.99954 1.65015C4.94954 1.65015 1.64954 4.95015 1.64954 9.00015C1.64954 10.2001 1.94954 11.3251 2.47454 12.3751L1.64954 15.6001C1.57454 15.8251 1.64954 16.0501 1.79954 16.2001C1.94954 16.3501 2.09954 16.3501 2.24954 16.3501C2.32454 16.3501 2.32454 16.3501 2.39954 16.3501L5.62454 15.5251C6.67454 16.0501 7.79954 16.3501 8.99954 16.3501C13.0495 16.3501 16.3495 13.0501 16.3495 9.00015C16.3495 4.95015 13.0495 1.65015 8.99954 1.65015ZM8.99954 15.1501C7.94954 15.1501 6.89954 14.8501 5.99954 14.4001C5.92454 14.3251 5.77454 14.3251 5.69954 14.3251C5.62454 14.3251 5.62454 14.3251 5.54954 14.3251L3.07454 14.9251L3.67454 12.4501C3.67454 12.3001 3.67454 12.1501 3.59954 12.0001C3.07454 11.1001 2.84954 10.0501 2.84954 9.00015C2.84954 5.62515 5.62454 2.85015 8.99954 2.85015C12.3745 2.85015 15.1495 5.62515 15.1495 9.00015C15.1495 12.3751 12.3745 15.1501 8.99954 15.1501Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ReplyIcon
