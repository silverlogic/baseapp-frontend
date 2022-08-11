import { Button } from '@mui/material'
import { CircularProgress } from './styled'
import { IButtonWitthLoadingProps } from './types'

function ButtonWithLoading({
  loading = false,
  children,
  loadingChildren = <CircularProgress size="20px" />,
  ...props
}: IButtonWitthLoadingProps) {
  return (
    <Button disabled={loading} {...props}>
      {children}
      {loading && loadingChildren}
    </Button>
  )
}

export default ButtonWithLoading
