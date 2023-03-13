import { Button } from '@mui/material'

import { CircularProgress } from './styled'
import { IButtonWitthLoadingProps } from './types'

function ButtonWithLoading({
  loading = false,
  children,
  loadingChildren = <CircularProgress size="20px" />,
  form,
  ...props
}: IButtonWitthLoadingProps) {
  const isLoading = loading || form?.formState.isSubmitting
  return (
    <Button disabled={isLoading} {...props}>
      {children}
      {isLoading && loadingChildren}
    </Button>
  )
}

export default ButtonWithLoading
