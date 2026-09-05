import { FC } from 'react'

import { ArrowIosForwardIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ArrowProps } from './types'

const Arrow: FC<ArrowProps> = ({ Icon, isExpanded, sx, ...props }) => {
  const IconComponent = Icon ?? ArrowIosForwardIcon

  return (
    <IconComponent
      sx={{
        fontSize: '16px',
        transform: `rotate(${isExpanded ? '-90deg' : '0deg'})`,
        transition: 'all 0.25s linear',
        color: 'text.secondary',
        ...sx,
      }}
      {...props}
    />
  )
}

export default Arrow
