import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const LinkIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 18, color: 'action.active', ...sx }} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.77962 3.59486C10.3385 2.07438 12.8302 2.08991 14.37 3.62971C15.9098 5.16951 15.9253 7.66118 14.4048 9.22006L14.3999 9.22508L12.756 10.869C12.5363 11.0887 12.1801 11.0887 11.9605 10.869C11.7408 10.6493 11.7408 10.2932 11.9605 10.0735L13.6018 8.43215C14.6899 7.31399 14.678 5.52874 13.5745 4.4252C12.4709 3.32166 10.6857 3.30975 9.56754 4.39787L7.92619 6.03922C7.70652 6.25889 7.35036 6.25889 7.13069 6.03922C6.91102 5.81955 6.91102 5.4634 7.13069 5.24373L8.77962 3.59486Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3988 6.60128C11.6185 6.82095 11.6185 7.1771 11.3988 7.39677L7.39665 11.3989C7.17698 11.6186 6.82082 11.6186 6.60115 11.3989C6.38148 11.1793 6.38148 10.8231 6.60115 10.6034L10.6033 6.60128C10.823 6.38161 11.1791 6.38161 11.3988 6.60128Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.03946 7.13082C6.25913 7.35049 6.25913 7.70664 6.03946 7.92631L4.39812 9.56766C3.31 10.6858 3.32191 12.4711 4.42545 13.5746C5.52899 14.6781 7.31423 14.69 8.4324 13.6019L10.0737 11.9606C10.2934 11.7409 10.6496 11.7409 10.8692 11.9606C11.0889 12.1802 11.0889 12.5364 10.8692 12.7561L9.22033 14.405C7.66146 15.9255 5.16975 15.9099 3.62995 14.3701C2.09015 12.8303 2.07462 10.3386 3.59511 8.77974L3.6 8.77472L5.24397 7.13082C5.46364 6.91115 5.81979 6.91115 6.03946 7.13082Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default LinkIcon
