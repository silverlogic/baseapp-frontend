import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const PillIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.5" width="18" height="8" rx="4" fill="currentColor" />
    </svg>
  </SvgIcon>
)

export default PillIcon
