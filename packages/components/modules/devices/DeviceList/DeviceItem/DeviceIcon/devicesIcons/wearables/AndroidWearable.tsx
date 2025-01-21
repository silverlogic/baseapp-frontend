import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AndroidWearableIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="2" width="13" height="60" rx="4" fill="#919EAB" />
      <rect x="18" y="18" width="29" height="29" rx="14.5" fill="url(#paint0_linear_4399_33670)" />
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
      <path
        d="M39.9387 35.7435H25.062C25.3001 33.2219 26.7414 31.068 28.8695 29.9149L27.6354 27.7772C27.5658 27.6573 27.6062 27.5051 27.7261 27.4354C27.8459 27.3658 27.9982 27.4063 28.0678 27.5261L29.3181 29.6914C30.2719 29.2558 31.3457 29.0128 32.5004 29.0128C33.6551 29.0128 34.7288 29.2558 35.6827 29.6914L36.9329 27.5261C37.0009 27.4063 37.1548 27.3658 37.273 27.4354C37.3912 27.5051 37.4334 27.6573 37.3637 27.7772L36.1297 29.9149C38.2593 31.068 39.7007 33.2219 39.9387 35.7435ZM35.9143 33.6543C36.2592 33.6543 36.5394 33.3741 36.5378 33.0308C36.5378 32.6875 36.2592 32.4073 35.9143 32.4073C35.5709 32.4073 35.2908 32.6858 35.2908 33.0308C35.2908 33.3741 35.5693 33.6543 35.9143 33.6543ZM29.0848 33.6543C29.4298 33.6543 29.71 33.3741 29.7084 33.0308C29.7084 32.6875 29.4298 32.4073 29.0848 32.4073C28.7415 32.4073 28.4613 32.6858 28.4613 33.0308C28.4613 33.3741 28.7399 33.6543 29.0848 33.6543Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4399_33670"
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

export default AndroidWearableIcon
