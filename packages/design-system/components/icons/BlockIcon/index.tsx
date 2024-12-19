import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const BlockIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'grey.800', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8943 5.10567C19.1872 5.39856 19.1872 5.87344 18.8943 6.16633L6.16633 18.8943C5.87344 19.1872 5.39856 19.1872 5.10567 18.8943C4.81278 18.6014 4.81278 18.1266 5.10567 17.8337L17.8337 5.10567C18.1266 4.81278 18.6014 4.81278 18.8943 5.10567Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 12C2.25 6.61479 6.61479 2.25 12 2.25C17.3852 2.25 21.75 6.61479 21.75 12C21.75 17.3852 17.3852 21.75 12 21.75C6.61479 21.75 2.25 17.3852 2.25 12ZM12 3.75C7.44321 3.75 3.75 7.44321 3.75 12C3.75 16.5568 7.44321 20.25 12 20.25C16.5568 20.25 20.25 16.5568 20.25 12C20.25 7.44321 16.5568 3.75 12 3.75Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default BlockIcon
