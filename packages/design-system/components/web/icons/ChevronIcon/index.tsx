import { FC } from 'react'

import { SvgIcon } from '@mui/material'

import { OPPOSITE_POSITION, POSITION_DEGREE } from './constants'
import { ChevronIconProps } from './types'

const ChevronIcon: FC<ChevronIconProps> = ({ isOpen, position = 'bottom', sx, ...props }) => {
  const dynamicPosition = isOpen ? OPPOSITE_POSITION[position] : position

  return (
    <SvgIcon
      sx={{
        fontSize: 24,
        color: 'grey.500',
        transform: `rotate(${POSITION_DEGREE[dynamicPosition]}deg)`,
        transition: 'all 0.25s linear',
        ...sx,
      }}
      {...props}
    >
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
    </SvgIcon>
  )
}

export default ChevronIcon
