import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const BellIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '20',
  height = '21',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 20 21" color={svgColor} fill="none" {...props}>
      <Path
        d="M11.6674 17.2852C11.2738 17.81 10.656 18.1188 10 18.1188C9.34399 18.1188 8.72625 17.81 8.33264 17.2852"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.99796 11.018V8.11536C4.99796 5.35279 7.23747 3.11328 10 3.11328V3.11328C11.3267 3.11328 12.599 3.64028 13.537 4.57836C14.4751 5.51643 15.0021 6.78873 15.0021 8.11536V11.018H14.9983L16.1455 12.166C16.6539 12.6748 16.8058 13.4398 16.5303 14.1042C16.2549 14.7687 15.6064 15.2018 14.8871 15.2016H5.113C4.39373 15.2018 3.74518 14.7687 3.46973 14.1042C3.19429 13.4398 3.34618 12.6748 3.85459 12.166L5.00173 11.018"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default BellIcon
