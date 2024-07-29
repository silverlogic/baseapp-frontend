import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const FavoriteSelectedIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0002 20.7998C10.0002 20.7998 2.2002 16.0998 2.2002 9.7998C2.2002 6.6998 4.6002 3.2998 8.3002 3.2998C10.0002 3.2998 11.2002 3.9998 12.0002 4.6998C12.8002 3.9998 14.0002 3.2998 15.7002 3.2998C19.3002 3.2998 21.8002 6.6998 21.8002 9.7998C21.8002 16.0998 14.0002 20.7998 12.0002 20.7998Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default FavoriteSelectedIcon
