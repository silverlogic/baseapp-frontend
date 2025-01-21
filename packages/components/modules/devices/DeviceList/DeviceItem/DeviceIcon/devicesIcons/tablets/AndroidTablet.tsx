import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AndroidTabletIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="3" width="39" height="58" rx="4" fill="url(#paint0_linear_4399_33666)" />
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
      <path
        d="M39.9387 35.2435H25.062C25.3001 32.7219 26.7414 30.568 28.8695 29.4149L27.6354 27.2772C27.5658 27.1573 27.6062 27.0051 27.7261 26.9354C27.8459 26.8658 27.9982 26.9063 28.0678 27.0261L29.3181 29.1914C30.2719 28.7558 31.3457 28.5128 32.5004 28.5128C33.6551 28.5128 34.7288 28.7558 35.6827 29.1914L36.9329 27.0261C37.0009 26.9063 37.1548 26.8658 37.273 26.9354C37.3912 27.0051 37.4334 27.1573 37.3637 27.2772L36.1297 29.4149C38.2593 30.568 39.7007 32.7219 39.9387 35.2435ZM35.9143 33.1543C36.2592 33.1543 36.5394 32.8741 36.5378 32.5308C36.5378 32.1875 36.2592 31.9073 35.9143 31.9073C35.5709 31.9073 35.2908 32.1858 35.2908 32.5308C35.2908 32.8741 35.5693 33.1543 35.9143 33.1543ZM29.0848 33.1543C29.4298 33.1543 29.71 32.8741 29.7084 32.5308C29.7084 32.1875 29.4298 31.9073 29.0848 31.9073C28.7415 31.9073 28.4613 32.1858 28.4613 32.5308C28.4613 32.8741 28.7399 33.1543 29.0848 33.1543Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4399_33666"
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

export default AndroidTabletIcon
