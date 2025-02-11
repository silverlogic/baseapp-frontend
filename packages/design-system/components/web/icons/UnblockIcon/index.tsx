import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const UnblockIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'grey.800', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 10.75C6.30921 10.75 5.75 11.3092 5.75 12V19C5.75 19.6908 6.30921 20.25 7 20.25H17C17.6908 20.25 18.25 19.6908 18.25 19V12C18.25 11.3092 17.6908 10.75 17 10.75H7ZM4.25 12C4.25 10.4808 5.48079 9.25 7 9.25H17C18.5192 9.25 19.75 10.4808 19.75 12V19C19.75 20.5192 18.5192 21.75 17 21.75H7C5.48079 21.75 4.25 20.5192 4.25 19V12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.40684 5.83932C7.92584 3.78467 9.77395 2.25 12 2.25C14.6232 2.25 16.75 4.37679 16.75 7C16.75 7.41421 16.4142 7.75 16 7.75C15.5858 7.75 15.25 7.41421 15.25 7C15.25 5.20521 13.7948 3.75 12 3.75C10.486 3.75 9.21816 4.79333 8.86116 6.20668C8.75972 6.60828 8.35192 6.8516 7.95032 6.75016C7.54872 6.64872 7.3054 6.24092 7.40684 5.83932Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6.25C16.4142 6.25 16.75 6.58579 16.75 7V10C16.75 10.4142 16.4142 10.75 16 10.75C15.5858 10.75 15.25 10.4142 15.25 10V7C15.25 6.58579 15.5858 6.25 16 6.25Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default UnblockIcon
