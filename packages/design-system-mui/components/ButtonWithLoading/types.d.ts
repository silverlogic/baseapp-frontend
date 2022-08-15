import { Button, ButtonProps } from '@mui/material'

export interface IButtonWitthLoadingProps extends ButtonProps {
  children?: React.FC<any> | React.Element | string
  loading?: boolean
  loadingChildren?: React.FC<any> | React.Element
  formik?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
