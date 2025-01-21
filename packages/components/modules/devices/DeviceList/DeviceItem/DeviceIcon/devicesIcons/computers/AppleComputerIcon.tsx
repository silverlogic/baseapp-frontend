import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AppleComputerIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 64, ...sx }} {...props}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="58" height="36" rx="2" fill="url(#paint0_linear_4388_113147)" />
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
      <path
        d="M36.7708 27.8526C36.6925 27.9134 35.3099 28.6924 35.3099 30.4246C35.3099 32.4282 37.0692 33.137 37.1218 33.1546C37.1137 33.1978 36.8423 34.1253 36.1943 35.0704C35.6164 35.9021 35.0129 36.7324 34.0948 36.7324C33.1767 36.7324 32.9405 36.1991 31.8806 36.1991C30.8477 36.1991 30.4805 36.75 29.6407 36.75C28.8009 36.75 28.215 35.9804 27.5413 35.0353C26.7609 33.9255 26.1304 32.2014 26.1304 30.565C26.1304 27.9404 27.8369 26.5484 29.5165 26.5484C30.4089 26.5484 31.1529 27.1343 31.7132 27.1343C32.2465 27.1343 33.0782 26.5133 34.0935 26.5133C34.4783 26.5133 35.8608 26.5484 36.7708 27.8526ZM33.6115 25.4021C34.0314 24.9039 34.3284 24.2126 34.3284 23.5214C34.3284 23.4255 34.3203 23.3283 34.3027 23.25C33.6196 23.2757 32.8068 23.705 32.3167 24.2734C31.9319 24.7108 31.5728 25.4021 31.5728 26.1028C31.5728 26.2081 31.5903 26.3135 31.5984 26.3472C31.6416 26.3553 31.7118 26.3648 31.782 26.3648C32.395 26.3648 33.1659 25.9543 33.6115 25.4021Z"
        fill="white"
      />
      <path d="M2 53H62" stroke="#919EAB" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient
          id="paint0_linear_4388_113147"
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

export default AppleComputerIcon
