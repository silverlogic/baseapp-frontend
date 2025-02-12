import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const WindowsComputerIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="58" height="36" rx="2" fill="url(#paint0_linear_4399_33657)" />
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
      <path d="M31.6874 23.9883H25.9888V29.6869H31.6874V23.9883Z" fill="white" />
      <path d="M38.0113 23.9883H32.3126V29.6869H38.0113V23.9883Z" fill="white" />
      <path d="M31.6874 30.3127H25.9888V36.0113H31.6874V30.3127Z" fill="white" />
      <path d="M38.0113 30.3127H32.3126V36.0113H38.0113V30.3127Z" fill="white" />
      <path d="M2 53H62" stroke="#919EAB" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient
          id="paint0_linear_4399_33657"
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

export default WindowsComputerIcon
