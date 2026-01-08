import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const LeaveIcon: FC<SvgIconProps> = ({
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
      <Path
        fill="currentColor"
        d="M12.8095 6.3662L16.9779 10.5346A0.75 0.75 0 0 1 18.0385 9.4740L13.8701 5.3056A0.75 0.75 0 0 1 12.8095 6.3662Z"
      />
      <Path
        fill="currentColor"
        d="M13.8701 14.7046L18.0385 10.5362A0.75 0.75 0 0 1 16.9779 9.4756L12.8095 13.6440A0.75 0.75 0 0 1 13.8701 14.7046Z"
      />
      <Path
        fill="currentColor"
        d="M8.33594 9.2547H17.5064A0.75 0.75 0 0 1 17.5064 10.7547H8.33594A0.75 0.75 0 0 1 8.33594 9.2547Z"
      />

      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.08576 18.2577H6.39051
          C3.82763 18.2577 1.75 16.1801 1.75 13.6171V6.66981
          C1.75 4.10693 3.82763 2.0293 6.39051 2.0293H9.08576
          V3.5293H6.39051
          C4.65506 3.5293 3.25 4.93436 3.25 6.66981V13.6171
          C3.25 15.3526 4.65506 16.7577 6.39051 16.7577H9.08576
          V18.2577Z"
      />
    </Svg>
  )
}

export default LeaveIcon
