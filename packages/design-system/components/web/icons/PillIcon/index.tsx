import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const PillIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon viewBox="0 0 18 9" sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <rect y="0.5" width="18" height="8" rx="4" fill="currentColor" />
  </SvgIcon>
)

export default PillIcon
