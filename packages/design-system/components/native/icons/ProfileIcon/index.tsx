import { FC } from 'react'

import Svg, { G, Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const ProfileIcon: FC<SvgIconProps> = ({
  isActive = false,
  color,
  width = '25',
  height = '24',
  ...props
}) => {
  const { colors } = useTheme()

  const defaultColor = color ?? colors.object.high
  const svgColor = isActive ? colors.primary.high : defaultColor

  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" color={svgColor} {...props}>
      <G>
        <G>
          <Path
            d="M12.7502 11.1998C13.8502 11.1998 14.9502 10.7998 15.7502 9.9998C17.4502 8.2998 17.4502 5.5998 15.7502 3.9998C14.9502 3.1998 13.8502 2.7998 12.7502 2.7998C11.6502 2.7998 10.5502 3.1998 9.7502 3.9998C8.05019 5.6998 8.05019 8.3998 9.7502 9.9998C10.5502 10.7998 11.6502 11.1998 12.7502 11.1998ZM10.8502 5.0998C11.3502 4.5998 12.0502 4.2998 12.7502 4.2998C13.4502 4.2998 14.1502 4.5998 14.6502 5.0998C15.7502 6.1998 15.7502 7.8998 14.6502 8.9998C13.6502 9.9998 11.8502 9.9998 10.7502 8.9998C9.7502 7.8998 9.7502 6.0998 10.8502 5.0998Z"
            fill="currentColor"
          />
          <Path
            d="M12.7502 12.7998C8.4502 12.7998 3.9502 14.8998 3.9502 18.4998V19.4998C3.9502 20.4998 4.7502 21.2998 5.7502 21.2998H19.7502C20.7502 21.2998 21.5502 20.4998 21.5502 19.4998V18.4998C21.5502 14.8998 17.0502 12.7998 12.7502 12.7998ZM19.9502 19.4998C19.9502 19.5998 19.8502 19.6998 19.7502 19.6998H5.7502C5.6502 19.6998 5.5502 19.5998 5.5502 19.4998V18.4998C5.5502 15.8998 9.3502 14.2998 12.7502 14.2998C16.2502 14.2998 19.9502 15.8998 19.9502 18.4998V19.4998Z"
            fill="currentColor"
          />
        </G>
      </G>
    </Svg>
  )
}

export default ProfileIcon
