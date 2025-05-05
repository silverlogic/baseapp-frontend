import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const CreditCardIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'action.active', ...sx }} {...props}>
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 6H6V4.875C6 3.83947 6.67157 3 7.5 3H28.5C29.3284 3 30 3.83947 30 4.875V6ZM30 9.75V19.5C30 20.3284 29.3284 21 28.5 21H7.5C6.67157 21 6 20.3284 6 19.5V9.75H30ZM12 15C11.1716 15 10.5 15.6716 10.5 16.5C10.5 17.3284 11.1716 18 12 18H13.5C14.3284 18 15 17.3284 15 16.5C15 15.6716 14.3284 15 13.5 15H12Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default CreditCardIcon
