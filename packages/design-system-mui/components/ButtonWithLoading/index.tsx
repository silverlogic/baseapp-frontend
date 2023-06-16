import { FC } from 'react'

import { Button } from '@mui/material'

import { CircularProgress } from './styled'
import { IButtonWitthLoadingProps } from './types'

const ButtonWithLoading: FC<IButtonWitthLoadingProps> = ({
  children,
  isLoading = false,
  loadingComponent = <CircularProgress size="20px" />,
  ...props
}) => (
  <Button disabled={isLoading} {...props}>
    {children}
    {isLoading && loadingComponent}
  </Button>
)

export default ButtonWithLoading
