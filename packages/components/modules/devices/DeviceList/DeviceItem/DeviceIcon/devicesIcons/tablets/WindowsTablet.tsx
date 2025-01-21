import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const WindowsTabletIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="3" width="39" height="58" rx="4" fill="url(#paint0_linear_4399_33858)" />
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
      <path d="M32.1874 25.9883H26.4888V31.6869H32.1874V25.9883Z" fill="white" />
      <path d="M38.5113 25.9883H32.8126V31.6869H38.5113V25.9883Z" fill="white" />
      <path d="M32.1874 32.3127H26.4888V38.0113H32.1874V32.3127Z" fill="white" />
      <path d="M38.5113 32.3127H32.8126V38.0113H38.5113V32.3127Z" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_4399_33858"
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

export default WindowsTabletIcon
