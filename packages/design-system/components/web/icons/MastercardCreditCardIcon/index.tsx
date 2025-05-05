import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const MastercardCreditCardIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'action.active', ...sx }} {...props}>
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="5" y="3" width="26" height="18" fill="url(#pattern0_0_8810)" />
      <defs>
        <pattern id="pattern0_0_8810" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use
            xlinkHref="#image0_0_8810"
            transform="matrix(0.00713719 0 0 0.0103093 -0.0138779 0)"
          />
        </pattern>
        <image
          id="image0_0_8810"
          width="144"
          height="97"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  </SvgIcon>
)

export default MastercardCreditCardIcon
