import { FC } from 'react'

import { OPPOSITE_POSITION, POSITION_DEGREE } from './constants'
import { RotatingSvgIcon } from './styled'
import { ChevronIconProps } from './types'

const ChevronIcon: FC<ChevronIconProps> = ({ isOpen, position = 'bottom', sx, ...props }) => {
  const dynamicPosition = isOpen ? OPPOSITE_POSITION[position] : position

  return (
    <RotatingSvgIcon rotation={POSITION_DEGREE[dynamicPosition]} sx={sx} {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10L12 14L16 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RotatingSvgIcon>
  )
}

export default ChevronIcon
