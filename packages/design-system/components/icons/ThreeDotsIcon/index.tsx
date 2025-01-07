import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const ThreeDotsIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'action.active', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.997 17.5024C11.7219 17.5024 11.4968 17.7275 11.4998 18.0026C11.4998 18.2778 11.7249 18.5029 12 18.5029C12.2751 18.5029 12.5002 18.2778 12.5002 18.0026C12.5002 17.7275 12.2751 17.5024 11.997 17.5024"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.997 11.5C11.7219 11.5 11.4968 11.7251 11.4998 12.0002C11.4998 12.2753 11.7249 12.5004 12 12.5004C12.2751 12.5004 12.5002 12.2753 12.5002 12.0002C12.5002 11.7251 12.2751 11.5 11.997 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.997 5.49756C11.7219 5.49756 11.4968 5.72265 11.4998 5.99777C11.4998 6.27288 11.7249 6.49798 12 6.49798C12.2751 6.49798 12.5002 6.27288 12.5002 5.99777C12.5002 5.72265 12.2751 5.49756 11.997 5.49756"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
)

export default ThreeDotsIcon
