import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const BlockIcon: FC<SvgIconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7453 4.86996C15.9894 5.11404 15.9894 5.50977 15.7453 5.75384L5.13861 16.3605C4.89453 16.6046 4.4988 16.6046 4.25472 16.3605C4.01065 16.1164 4.01065 15.7207 4.25472 15.4766L14.8614 4.86996C15.1055 4.62588 15.5012 4.62588 15.7453 4.86996Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 10.6152C1.875 6.12756 5.51232 2.49023 10 2.49023C14.4877 2.49023 18.125 6.12756 18.125 10.6152C18.125 15.1029 14.4877 18.7402 10 18.7402C5.51232 18.7402 1.875 15.1029 1.875 10.6152ZM10 3.74023C6.20268 3.74023 3.125 6.81791 3.125 10.6152C3.125 14.4126 6.20268 17.4902 10 17.4902C13.7973 17.4902 16.875 14.4126 16.875 10.6152C16.875 6.81791 13.7973 3.74023 10 3.74023Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default BlockIcon
