import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const ErrorIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 20, color: 'text.primary', ...sx }} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group">
        <g id="Group_2">
          <path
            id="Path"
            d="M12 12V7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Path_2"
            d="M11.999 15.5C11.861 15.5 11.749 15.612 11.75 15.75C11.75 15.888 11.862 16 12 16C12.138 16 12.25 15.888 12.25 15.75C12.25 15.612 12.138 15.5 11.999 15.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Path_3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 14.3815V9.61948C3 8.01748 3.852 6.53648 5.236 5.73048L9.736 3.11148C11.135 2.29748 12.864 2.29748 14.263 3.11148L18.763 5.73048C20.148 6.53648 21 8.01748 21 9.61948V14.3815C21 15.9835 20.148 17.4645 18.764 18.2705L14.264 20.8895C12.865 21.7035 11.136 21.7035 9.737 20.8895L5.237 18.2705C3.852 17.4645 3 15.9835 3 14.3815Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  </SvgIcon>
)

export default ErrorIcon
