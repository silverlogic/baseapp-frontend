import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const SendMessageIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 16, color: 'primary.main', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.575 1.3C15.2 0.625 14.525 0.25 13.775 0.25H2.525C1.7 0.25 0.95 0.775 0.65 1.6C0.35 2.425 0.5 3.25 1.1 3.85L3.95 6.7L11.15 3.325C11.525 3.175 11.825 3.7 11.45 3.925L4.925 8.275L5.975 12.625C6.2 13.45 6.875 14.05 7.7 14.2C8.525 14.35 9.35 13.9 9.8 13.225L15.575 3.475C15.95 2.8 15.95 1.975 15.575 1.3Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default SendMessageIcon
