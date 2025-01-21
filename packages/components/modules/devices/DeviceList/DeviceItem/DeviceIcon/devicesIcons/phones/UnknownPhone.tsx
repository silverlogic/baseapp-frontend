import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const UnknownPhoneIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="3" width="29" height="58" rx="4" fill="url(#paint0_linear_5765_29038)" />
      <rect
        x="18"
        y="3"
        width="29"
        height="58"
        rx="4"
        stroke="#919EAB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32.5" cy="54.5" r="2.5" fill="#919EAB" />
      <defs>
        <linearGradient
          id="paint0_linear_5765_29038"
          x1="18"
          y1="3"
          x2="64.4"
          y2="26.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52545A" />
          <stop offset="1" stopColor="#31343F" />
        </linearGradient>
      </defs>
    </svg>
  </SvgIcon>
)

export default UnknownPhoneIcon
