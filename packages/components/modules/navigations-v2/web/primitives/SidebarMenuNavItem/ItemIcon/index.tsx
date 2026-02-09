import { FC } from 'react'

import { Theme } from '@mui/material'

import { ItemIconProps } from './types'

const ItemIcon: FC<ItemIconProps> = ({ Icon = null, sx, ...props }) => {
  if (!Icon) return null

  return (
    <Icon
      sx={{
        height: 24,
        width: 24,
        marginRight: (theme: Theme) => theme.spacing(2),
        color: (theme: Theme) => theme.palette.text.secondary,
        ...sx,
      }}
      {...props}
    />
  )
}

export default ItemIcon
