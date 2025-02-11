import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const TrashIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '21',
  height = '21',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" color={svgColor} {...props}>
      <G id="Group">
        <G id="Group_2">
          <Path
            id="Path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.0839 17.9733H7.18393C6.31143 17.9733 5.58643 17.3 5.52143 16.4291L4.77393 6.30664H16.4689L15.7464 16.425C15.6839 17.2975 14.9581 17.9733 14.0839 17.9733V17.9733Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Path_2"
            d="M10.6359 9.63867V14.6387"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Path_3"
            d="M3.96924 6.30534H17.3026"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Path_4"
            d="M14.8026 6.30599L13.9584 4.05432C13.7142 3.40349 13.0926 2.97266 12.3976 2.97266H8.87424C8.17924 2.97266 7.55757 3.40349 7.3134 4.05432L6.46924 6.30599"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Path_5"
            d="M13.4943 9.63867L13.1359 14.6387"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Path_6"
            d="M7.77754 9.63867L8.13587 14.6387"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  )
}

export default TrashIcon
