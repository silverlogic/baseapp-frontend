import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const CheckIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.21674 11C4.98577 10.9993 4.76547 10.9027 4.60841 10.7333L0.558407 6.42499C0.243145 6.08902 0.259934 5.56109 0.595907 5.24583C0.93188 4.93057 1.45981 4.94735 1.77507 5.28333L5.20841 8.94166L12.2167 1.27499C12.4105 1.03367 12.7221 0.919634 13.0259 0.978835C13.3297 1.03804 13.5756 1.26072 13.6646 1.55715C13.7536 1.85358 13.671 2.17492 13.4501 2.39166L5.83341 10.725C5.67781 10.8974 5.45731 10.9971 5.22507 11H5.21674Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default CheckIcon
