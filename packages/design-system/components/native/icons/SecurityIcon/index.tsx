import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const SecurityIcon: FC<SvgIconProps> = ({
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
        d="M7.08337 8.5319H12.9167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.08337 11.8659H12.9167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6667 9.98336C16.6667 13.6234 14.0359 17.035 10.4334 18.055C10.1517 18.135 9.84837 18.135 9.56671 18.055C5.96421 17.0359 3.33337 13.6234 3.33337 9.98336V6.62669C3.33337 5.95003 3.74254 5.34003 4.36921 5.08419L8.42254 3.42586C9.43421 3.01169 10.5675 3.01169 11.5784 3.42586L15.6317 5.08419C16.2575 5.34003 16.6667 5.95003 16.6667 6.62669V9.98336Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SecurityIcon
