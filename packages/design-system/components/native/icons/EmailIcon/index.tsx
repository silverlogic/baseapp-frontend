import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const EmailIcon: FC<SvgIconProps> = ({
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
    <Svg width={width} height={height} viewBox="0 0 21 21" color={svgColor} fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.42773 7.60026C2.42773 4.9539 4.57304 2.80859 7.2194 2.80859H13.8861C16.5324 2.80859 18.6777 4.9539 18.6777 7.60026V12.6003C18.6777 15.2466 16.5324 17.3919 13.8861 17.3919H7.2194C4.57304 17.3919 2.42773 15.2466 2.42773 12.6003V7.60026ZM7.2194 4.05859C5.26339 4.05859 3.67773 5.64425 3.67773 7.60026V12.6003C3.67773 14.5563 5.26339 16.1419 7.2194 16.1419H13.8861C15.8421 16.1419 17.4277 14.5563 17.4277 12.6003V7.60026C17.4277 5.64425 15.8421 4.05859 13.8861 4.05859H7.2194Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.49039 7.1988C5.7121 6.93425 6.10631 6.89952 6.37086 7.12124L9.88366 10.0653C10.2707 10.3897 10.8347 10.3897 11.2218 10.0653L14.7346 7.12124C14.9992 6.89952 15.3934 6.93425 15.6151 7.1988C15.8368 7.46335 15.8021 7.85756 15.5375 8.07928L12.0247 11.0233C11.1732 11.737 9.9323 11.737 9.08074 11.0233L5.56794 8.07928C5.30339 7.85756 5.26867 7.46335 5.49039 7.1988Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default EmailIcon
