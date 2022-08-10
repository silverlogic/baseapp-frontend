import { useState } from 'react'
import { Button, CircularProgress } from './styled'

function ButtonWithLoading({
  loading = false,
  children,
  loadingChildren = <CircularProgress size="20px" />,
  loadingColor = 'primary',
  ...props
}) {
  return (
    <Button disabled={loading} {...props}>
      {children}
      {loading && loadingChildren}
    </Button>
  )
}

export default ButtonWithLoading
