import { FC, useState } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { SvgIconProps } from '@mui/material'

const SidebarMenuNavItemArrow = ({ Icon }: { Icon?: FC<SvgIconProps> }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const IconComponent = Icon ?? ChevronIcon

  return (
    <IconComponent
      sx={{
        transform: `rotate(${isExpanded ? '-90deg' : '0deg'})`,
        transition: 'all 0.25s linear',
      }}
      onClick={handleClick}
    />
  )
}

export default SidebarMenuNavItemArrow
