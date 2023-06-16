import { Element } from 'react'

import { ButtonProps } from '@mui/material'

export interface IButtonWitthLoadingProps extends ButtonProps {
  isLoading?: boolean
  loadingComponent?: Element
}
