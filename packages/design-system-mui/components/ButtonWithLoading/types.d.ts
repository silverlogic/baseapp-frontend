import { Button, ButtonProps } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

export interface IButtonWitthLoadingProps extends ButtonProps {
  children?: React.FC<any> | React.Element | string
  loading?: boolean
  loadingChildren?: React.FC<any> | React.Element
  form?: UseFormReturn
}
