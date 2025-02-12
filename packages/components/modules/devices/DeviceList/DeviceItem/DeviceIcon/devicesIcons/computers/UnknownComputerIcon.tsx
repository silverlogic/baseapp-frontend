import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const UnknownComputerIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="58" height="36" rx="2" fill="url(#paint0_linear_5765_29027)" />
      <rect
        x="3"
        y="12"
        width="58"
        height="36"
        rx="2"
        stroke="#919EAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M2 53H62" stroke="#919EAB" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient
          id="paint0_linear_5765_29027"
          x1="3"
          y1="12"
          x2="35.2609"
          y2="63.976"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52545A" />
          <stop offset="1" stopColor="#31343F" />
        </linearGradient>
      </defs>
    </svg>
  </SvgIcon>
)

export default UnknownComputerIcon
