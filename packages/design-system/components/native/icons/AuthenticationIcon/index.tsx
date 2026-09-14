import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const AuthenticationIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '24',
  height = '24',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" color={svgColor} {...props}>
      <Path
        d="M14.7 8.1998C14.1 8.1998 13.6 8.6998 13.6 9.2998C13.6 9.8998 13.7 9.8998 13.9 10.0998C14.1 10.2998 14.4 10.3998 14.7 10.3998C15.3 10.3998 15.8 9.8998 15.8 9.2998C15.8 8.6998 15.3 8.1998 14.7 8.1998Z"
        fill="currentColor"
      />
      <Path
        d="M19.2999 4.6998C18.0999 3.4998 16.4 2.7998 14.6 2.7998C12.8 2.7998 11.2 3.4998 9.89995 4.6998C8.19995 6.3998 7.59995 8.9998 8.29995 11.2998L2.89995 16.6998C2.79995 16.7998 2.69995 16.9998 2.69995 17.1998V20.4998C2.69995 20.8998 2.99995 21.2998 3.49995 21.2998H6.79995C6.99995 21.2998 7.19995 21.2998 7.29995 21.0998L12.7 15.6998C15 16.3998 17.5999 15.7998 19.2999 14.0998C21.8999 11.4998 21.8999 7.2998 19.2999 4.7998V4.6998ZM18.3 12.9998C16.9 14.3998 14.7 14.8998 12.8 14.0998C12.5 13.9998 12.2 14.0998 12 14.2998L6.49995 19.7998H4.29995V17.5998L9.79995 12.0998C9.99995 11.8998 10.1 11.5998 9.99995 11.2998C9.29995 9.3998 9.69995 7.2998 11.1 5.8998C12.1 4.8998 13.3 4.3998 14.7 4.3998C16.1 4.3998 17.3 4.8998 18.3 5.8998C20.3 7.8998 20.3 11.0998 18.3 13.0998V12.9998Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default AuthenticationIcon
