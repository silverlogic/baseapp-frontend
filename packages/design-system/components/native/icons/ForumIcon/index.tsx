import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const ForumIcon: FC<SvgIconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.248 15.5C11.248 15.0858 11.5838 14.75 11.998 14.75H15.998C16.4122 14.75 16.748 15.0858 16.748 15.5C16.748 15.9142 16.4122 16.25 15.998 16.25H11.998C11.5838 16.25 11.248 15.9142 11.248 15.5Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.248 12C11.248 11.5858 11.5838 11.25 11.998 11.25H15.998C16.4122 11.25 16.748 11.5858 16.748 12C16.748 12.4142 16.4122 12.75 15.998 12.75H11.998C11.5838 12.75 11.248 12.4142 11.248 12Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 15.5C7.25 15.0858 7.58579 14.75 8 14.75H9C9.41421 14.75 9.75 15.0858 9.75 15.5C9.75 15.9142 9.41421 16.25 9 16.25H8C7.58579 16.25 7.25 15.9142 7.25 15.5Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H9C9.41421 11.25 9.75 11.5858 9.75 12C9.75 12.4142 9.41421 12.75 9 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.75 16C21.75 19.1756 19.1756 21.75 16 21.75H8C4.82436 21.75 2.25 19.1756 2.25 16V8C2.25 4.82436 4.82436 2.25 8 2.25H16C19.1756 2.25 21.75 4.82436 21.75 8V16ZM16 20.25C18.3472 20.25 20.25 18.3472 20.25 16V8C20.25 5.65279 18.3472 3.75 16 3.75H8C5.65279 3.75 3.75 5.65279 3.75 8V16C3.75 18.3472 5.65279 20.25 8 20.25H16Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 8.5C7.25 8.08579 7.58579 7.75 8 7.75H16C16.4142 7.75 16.75 8.08579 16.75 8.5C16.75 8.91421 16.4142 9.25 16 9.25H8C7.58579 9.25 7.25 8.91421 7.25 8.5Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ForumIcon
