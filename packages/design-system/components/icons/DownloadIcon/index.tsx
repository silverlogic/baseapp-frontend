import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const DownloadIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 20, color: 'text.primary', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.875C10.3452 1.875 10.625 2.15482 10.625 2.5V14.1667C10.625 14.5118 10.3452 14.7917 10 14.7917C9.65482 14.7917 9.375 14.5118 9.375 14.1667V2.5C9.375 2.15482 9.65482 1.875 10 1.875Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 13.5417C2.84518 13.5417 3.125 13.8215 3.125 14.1667C3.125 15.6623 4.33768 16.875 5.83333 16.875H14.1667C15.6623 16.875 16.875 15.6623 16.875 14.1667C16.875 13.8215 17.1548 13.5417 17.5 13.5417C17.8452 13.5417 18.125 13.8215 18.125 14.1667C18.125 16.3527 16.3527 18.125 14.1667 18.125H5.83333C3.64732 18.125 1.875 16.3527 1.875 14.1667C1.875 13.8215 2.15482 13.5417 2.5 13.5417Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.3906 9.55801C5.6347 9.31396 6.03043 9.314 6.27449 9.5581L9.99921 13.2836L13.7247 9.55806C13.9688 9.31398 14.3645 9.31398 14.6086 9.55806C14.8527 9.80214 14.8527 10.1979 14.6086 10.4419L10.4411 14.6094C10.3239 14.7267 10.1649 14.7925 9.99914 14.7925C9.83336 14.7925 9.67439 14.7266 9.55718 14.6094L5.39051 10.4419C5.14646 10.1978 5.1465 9.80207 5.3906 9.55801Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default DownloadIcon
