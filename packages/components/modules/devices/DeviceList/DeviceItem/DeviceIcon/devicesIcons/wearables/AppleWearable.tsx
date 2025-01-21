import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AppleWearableIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="2" width="13" height="60" rx="4" fill="#919EAB" />
      <rect x="18" y="18" width="29" height="29" rx="14.5" fill="url(#paint0_linear_4389_113258)" />
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
        d="M37.2708 30.3526C37.1925 30.4134 35.8099 31.1924 35.8099 32.9246C35.8099 34.9282 37.5692 35.637 37.6218 35.6546C37.6137 35.6978 37.3423 36.6253 36.6943 37.5704C36.1164 38.4021 35.5129 39.2324 34.5948 39.2324C33.6767 39.2324 33.4405 38.6991 32.3806 38.6991C31.3477 38.6991 30.9805 39.25 30.1407 39.25C29.3009 39.25 28.715 38.4804 28.0413 37.5353C27.2609 36.4255 26.6304 34.7014 26.6304 33.065C26.6304 30.4404 28.3369 29.0484 30.0165 29.0484C30.9089 29.0484 31.6529 29.6343 32.2132 29.6343C32.7465 29.6343 33.5782 29.0133 34.5935 29.0133C34.9783 29.0133 36.3608 29.0484 37.2708 30.3526ZM34.1115 27.9021C34.5314 27.4039 34.8284 26.7126 34.8284 26.0214C34.8284 25.9255 34.8203 25.8283 34.8027 25.75C34.1196 25.7757 33.3068 26.205 32.8167 26.7734C32.4319 27.2108 32.0728 27.9021 32.0728 28.6028C32.0728 28.7081 32.0903 28.8135 32.0984 28.8472C32.1416 28.8553 32.2118 28.8648 32.282 28.8648C32.895 28.8648 33.6659 28.4543 34.1115 27.9021Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4389_113258"
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

export default AppleWearableIcon
