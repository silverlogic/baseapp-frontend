import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const UnknownWearableIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="2" width="13" height="60" rx="4" fill="#919EAB" />
      <rect x="18" y="18" width="29" height="29" rx="14.5" fill="url(#paint0_linear_5765_29058)" />
      <rect
        x="18"
        y="18"
        width="29"
        height="29"
        rx="14.5"
        stroke="#919EAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5765_29058"
          x1="18"
          y1="18"
          x2="47"
          y2="47"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52545A" />
          <stop offset="1" stopColor="#31343F" />
        </linearGradient>
      </defs>
    </svg>
  </SvgIcon>
)

export default UnknownWearableIcon
