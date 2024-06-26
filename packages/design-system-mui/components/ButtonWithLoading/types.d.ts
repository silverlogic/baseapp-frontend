import { Element } from 'react'

import { ButtonProps } from '@mui/material'

export interface IButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean
  loadingComponent?: Element
}
