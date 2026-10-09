import { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { useTheme } from '../../../../providers/native'
import { SvgIconProps } from '../types'

const FeatureRequestsIcon: FC<SvgIconProps> = ({
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
        d="M11.223 4.07242L8.7967 6.49869C8.36805 6.9281 8.36848 7.62454 8.79633 8.0524L11.223 10.479C11.6524 10.9075 12.3489 10.9072 12.7767 10.4794L15.2033 8.05276C15.6317 7.62334 15.6315 6.92684 15.2037 6.49906L12.777 4.07242C12.3479 3.64403 11.6521 3.64403 11.223 4.07242ZM13.837 3.01103C12.8222 1.99763 11.1778 1.99763 10.163 3.01103L7.73567 5.4384C6.72247 6.453 6.72157 8.09896 7.73567 9.11306L10.1627 11.5401C11.1773 12.5533 12.8232 12.5542 13.8373 11.5401L16.2643 9.11306C17.2775 8.09845 17.2784 6.45249 16.2643 5.4384L13.837 3.01103Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.666 14.5497C15.0495 14.5497 14.549 15.0507 14.549 15.6667V19.1337C14.549 19.7505 15.0492 20.2507 15.666 20.2507H19.133C19.75 20.2507 20.25 19.7503 20.25 19.1347V15.6677C20.25 15.0512 19.7499 14.5505 19.1326 14.5497H15.666ZM13.049 15.6667C13.049 14.2228 14.2205 13.0497 15.666 13.0497H19.133C20.5775 13.0511 21.75 14.2224 21.75 15.6677V19.1347C21.75 20.5792 20.578 21.7507 19.133 21.7507H15.666C14.2208 21.7507 13.049 20.5789 13.049 19.1337V15.6667Z"
        fill="currentColor"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6 14.5507C5.02621 14.5507 3.75 15.8269 3.75 17.4007C3.75 18.9745 5.02621 20.2507 6.6 20.2507C8.17379 20.2507 9.45 18.9745 9.45 17.4007C9.45 15.8269 8.17379 14.5507 6.6 14.5507ZM6.6 21.7507C4.19779 21.7507 2.25 19.8029 2.25 17.4007C2.25 14.9985 4.19779 13.0507 6.6 13.0507C9.00221 13.0507 10.95 14.9985 10.95 17.4007C10.95 19.8029 9.00221 21.7507 6.6 21.7507Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default FeatureRequestsIcon
