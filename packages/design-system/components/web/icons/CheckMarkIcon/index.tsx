import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const CheckMarkIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'primary.main', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M7.39507 13.5C7.18719 13.4993 6.98892 13.4124 6.84757 13.26L3.20257 9.38245C2.91883 9.08008 2.93394 8.60494 3.23632 8.3212C3.53869 8.03747 4.01383 8.05258 4.29757 8.35495L7.38757 11.6475L13.6951 4.74745C13.8695 4.53027 14.1499 4.42763 14.4233 4.48091C14.6967 4.53419 14.9181 4.73461 14.9982 5.0014C15.0783 5.26818 15.0039 5.55739 14.8051 5.75245L7.95007 13.2525C7.81003 13.4076 7.61158 13.4974 7.40257 13.5H7.39507Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default CheckMarkIcon
