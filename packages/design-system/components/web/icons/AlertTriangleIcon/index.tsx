import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AlertTriangleIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 52, ...sx }} {...props}>
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.56 24.3007L30.89 11.5807C30.2597 10.5947 29.1702 9.99805 28 9.99805C26.8297 9.99805 25.7403 10.5947 25.11 11.5807L17.44 24.3007C16.8885 25.2199 16.8695 26.3636 17.39 27.3007C17.992 28.3558 19.1152 29.0053 20.33 29.0007H35.67C36.8765 29.0135 37.9978 28.3804 38.61 27.3407C39.1461 26.3933 39.1269 25.2299 38.56 24.3007ZM28 25.0007C27.4477 25.0007 27 24.553 27 24.0007C27 23.4484 27.4477 23.0007 28 23.0007C28.5523 23.0007 29 23.4484 29 24.0007C29 24.553 28.5523 25.0007 28 25.0007ZM28 22.0007C28.5523 22.0007 29 21.553 29 21.0007V17.0007C29 16.4484 28.5523 16.0007 28 16.0007C27.4477 16.0007 27 16.4484 27 17.0007V21.0007C27 21.553 27.4477 22.0007 28 22.0007Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default AlertTriangleIcon
