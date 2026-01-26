import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgIconProps } from '../types'

const CheckMarkIcon: FC<SvgIconProps> = ({ width = '24', height = '24', ...props }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9.86106 18.0009C9.5839 18 9.31954 17.8841 9.13106 17.6809L4.27107 12.5109C3.89275 12.1077 3.9129 11.4742 4.31607 11.0959C4.71923 10.7176 5.35275 10.7377 5.73107 11.1409L9.85107 15.5309L18.2611 6.33092C18.4936 6.04133 18.8675 5.90448 19.232 5.97552C19.5966 6.04656 19.8917 6.31379 19.9985 6.66951C20.1053 7.02522 20.0062 7.41083 19.7411 7.67092L10.6011 17.6709C10.4144 17.8778 10.1498 17.9975 9.87107 18.0009H9.86106Z"
      fill="currentColor"
    />
  </Svg>
)

export default CheckMarkIcon
