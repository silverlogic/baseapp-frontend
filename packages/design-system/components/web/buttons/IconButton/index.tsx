'use client'

import { FC } from 'react'

import { CircularProgress } from '@mui/material'

import { StyledIconButton } from './styled'
import { IconButtonProps } from './types'

/**
 * This is a IconButton component.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Developers can freely edit this to suit the project's needs.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const IconButton: FC<IconButtonProps> = ({ children, ...props }) => {
  const content = props.isLoading ? <CircularProgress size={15} /> : children

  return <StyledIconButton {...props}>{content}</StyledIconButton>
}
export default IconButton
