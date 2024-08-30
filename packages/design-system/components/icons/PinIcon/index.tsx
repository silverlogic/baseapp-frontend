import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const PinIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 14, color: 'info.main', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M13.05 5.2001L8.625 0.775098C8.325 0.475098 7.875 0.400098 7.5 0.550098C7.125 0.700098 6.9 1.1501 6.9 1.6001L7.05 2.7251C7.05 2.8001 7.05 2.9501 6.975 3.0251L5.1 4.7501C5.025 4.8251 4.95 4.8251 4.875 4.8251H1.725C1.125 4.8251 0.6 5.2001 0.375 5.7251C0.225 6.2501 0.3 6.8501 0.75 7.3001L3.225 9.7751L0.375 12.6251C0.15 12.8501 0.15 13.2251 0.375 13.4501C0.45 13.5251 0.6 13.6001 0.75 13.6001C0.9 13.6001 1.05 13.5251 1.125 13.4501L3.975 10.6001L6.45 13.0751C6.75 13.3751 7.125 13.5251 7.5 13.5251C7.65 13.5251 7.875 13.5251 8.025 13.4501C8.55 13.2251 8.925 12.7001 8.925 12.1001V8.9501C8.925 8.8751 8.925 8.8001 9 8.7251L10.8 6.9251C10.875 6.8501 10.95 6.8501 11.025 6.8501L12.15 7.0001C12.6 7.0751 12.975 6.8501 13.2 6.4001C13.425 5.9501 13.35 5.5001 13.05 5.2001ZM11.175 5.6501C10.725 5.5751 10.275 5.7251 9.975 6.1001L8.25 7.8251C7.95 8.1251 7.8 8.5001 7.8 8.8751V12.0251C7.8 12.1751 7.725 12.2501 7.575 12.3251C7.425 12.4001 7.35 12.3251 7.2 12.2501L4.35 9.4001L1.5 6.4751C1.425 6.4001 1.35 6.2501 1.425 6.1001C1.5 5.9501 1.575 5.8751 1.725 5.8751H4.875C5.25 5.8751 5.625 5.7251 5.925 5.4251L7.725 3.6251C8.025 3.3251 8.175 2.8751 8.175 2.4251L8.025 1.7501L12 5.7251L11.175 5.6501Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default PinIcon