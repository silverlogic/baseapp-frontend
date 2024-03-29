import { forwardRef } from 'react'

import { Button } from '@mui/material'

import { CircularProgress } from './styled'
import { IButtonWitthLoadingProps } from './types'

export default forwardRef<HTMLButtonElement, IButtonWitthLoadingProps>(({
  children,
  isLoading = false,
  loadingComponent = <CircularProgress size="20px" />,
  ...props
}, ref) => (
  <Button disabled={isLoading} {...props} ref={ref}>
    {children}
    {isLoading && loadingComponent}
  </Button>
))
