import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const TrashCanIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'error.main', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M14.2499 4.65H3.7499C3.4499 4.65 3.1499 4.95 3.1499 5.25C3.1499 5.55 3.4499 5.85 3.7499 5.85H3.8999V13.5C3.8999 14.625 4.7999 15.6 5.9999 15.6H11.9999C13.1249 15.6 14.0999 14.7 14.0999 13.5V5.85H14.2499C14.5499 5.85 14.8499 5.625 14.8499 5.25C14.8499 4.875 14.5499 4.65 14.2499 4.65ZM12.8999 13.5C12.8999 14.025 12.4499 14.4 11.9999 14.4H5.9999C5.4749 14.4 5.0999 13.95 5.0999 13.5V5.85H12.9749V13.5H12.8999Z"
        fill="currentColor"
      />
      <path
        d="M6.7499 3.375H11.2499C11.5499 3.375 11.8499 3.15 11.8499 2.775C11.8499 2.4 11.5499 2.25 11.2499 2.25H6.7499C6.4499 2.25 6.1499 2.475 6.1499 2.85C6.1499 3.225 6.4499 3.375 6.7499 3.375Z"
        fill="currentColor"
      />
      <path
        d="M7.4999 12.6C7.7999 12.6 8.0999 12.375 8.0999 12V8.25C8.0999 7.95 7.8749 7.65 7.4999 7.65C7.1249 7.65 6.8999 7.95 6.8999 8.25V12C6.8999 12.3 7.1999 12.6 7.4999 12.6Z"
        fill="currentColor"
      />
      <path
        d="M10.4999 12.6C10.7999 12.6 11.0999 12.375 11.0999 12V8.25C11.0999 7.95 10.8749 7.65 10.4999 7.65C10.1249 7.65 9.8999 7.875 9.8999 8.25V12C9.8999 12.3 10.1999 12.6 10.4999 12.6Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default TrashCanIcon
