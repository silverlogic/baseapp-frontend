import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AppleTabletIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="3" width="39" height="58" rx="4" fill="url(#paint0_linear_4389_113234)" />
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
        d="M37.2708 29.8526C37.1925 29.9134 35.8099 30.6924 35.8099 32.4246C35.8099 34.4282 37.5692 35.137 37.6218 35.1546C37.6137 35.1978 37.3423 36.1253 36.6943 37.0704C36.1164 37.9021 35.5129 38.7324 34.5948 38.7324C33.6767 38.7324 33.4405 38.1991 32.3806 38.1991C31.3477 38.1991 30.9805 38.75 30.1407 38.75C29.3009 38.75 28.715 37.9804 28.0413 37.0353C27.2609 35.9255 26.6304 34.2014 26.6304 32.565C26.6304 29.9404 28.3369 28.5484 30.0165 28.5484C30.9089 28.5484 31.6529 29.1343 32.2132 29.1343C32.7465 29.1343 33.5782 28.5133 34.5935 28.5133C34.9783 28.5133 36.3608 28.5484 37.2708 29.8526ZM34.1115 27.4021C34.5314 26.9039 34.8284 26.2126 34.8284 25.5214C34.8284 25.4255 34.8203 25.3283 34.8027 25.25C34.1196 25.2757 33.3068 25.705 32.8167 26.2734C32.4319 26.7108 32.0728 27.4021 32.0728 28.1028C32.0728 28.2081 32.0903 28.3135 32.0984 28.3472C32.1416 28.3553 32.2118 28.3648 32.282 28.3648C32.895 28.3648 33.6659 27.9543 34.1115 27.4021Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4389_113234"
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

export default AppleTabletIcon
