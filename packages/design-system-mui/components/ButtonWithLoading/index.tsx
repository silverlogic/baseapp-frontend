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
  const _isLoading = loading || form?.formState.isSubmitting
  return (
    <Button disabled={_isLoading} {...props}>
      {children}
      {_isLoading && loadingChildren}
    </Button>
  )
}

export default ButtonWithLoading
