import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const UnknownTabletIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="3" width="39" height="58" rx="4" fill="url(#paint0_linear_5765_29048)" />
      <rect
        x="13"
        y="3"
        width="39"
        height="58"
        rx="4"
        stroke="#919EAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M25.5 56H39.5" stroke="#919EAB" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient
          id="paint0_linear_5765_29048"
          x1="13"
          y1="3"
          x2="66.7138"
          y2="39.1179"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52545A" />
          <stop offset="1" stopColor="#31343F" />
        </linearGradient>
      </defs>
    </svg>
  </SvgIcon>
)

export default UnknownTabletIcon
