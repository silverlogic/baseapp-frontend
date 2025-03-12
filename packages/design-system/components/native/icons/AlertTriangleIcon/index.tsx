import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const AlertTriangleIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '24',
  height = '25',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" color={svgColor} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5601 17.2714L14.8901 4.55137C14.2598 3.56537 13.1703 2.96875 12.0001 2.96875C10.8299 2.96875 9.74038 3.56537 9.1101 4.55137L1.4401 17.2714C0.888647 18.1906 0.869586 19.3343 1.3901 20.2714C1.99207 21.3265 3.11533 21.976 4.3301 21.9714H19.6701C20.8766 21.9842 21.9979 21.3511 22.6101 20.3114C23.1462 19.364 23.1271 18.2006 22.5601 17.2714ZM12.0001 17.9714C11.4478 17.9714 11.0001 17.5237 11.0001 16.9714C11.0001 16.4191 11.4478 15.9714 12.0001 15.9714C12.5524 15.9714 13.0001 16.4191 13.0001 16.9714C13.0001 17.5237 12.5524 17.9714 12.0001 17.9714ZM12.0001 14.9714C12.5524 14.9714 13.0001 14.5237 13.0001 13.9714V9.97137C13.0001 9.41909 12.5524 8.97137 12.0001 8.97137C11.4478 8.97137 11.0001 9.41909 11.0001 9.97137V13.9714C11.0001 14.5237 11.4478 14.9714 12.0001 14.9714Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default AlertTriangleIcon
