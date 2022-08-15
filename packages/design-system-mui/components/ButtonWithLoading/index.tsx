import { Button } from '@mui/material'
import { CircularProgress } from './styled'
import { IButtonWitthLoadingProps } from './types'

function ButtonWithLoading({
  loading = false,
  children,
  loadingChildren = <CircularProgress size="20px" />,
  formik,
  ...props
}: IButtonWitthLoadingProps) {
  const _isLoading = formik ? formik.isSubmitting : loading
  return (
    <Button disabled={loading} {...props}>
      {children}
      {_isLoading && loadingChildren}
    </Button>
  )
}

export default ButtonWithLoading
