import { PropsWithChildren } from 'react'

import { ButtonProps } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

export interface IButtonWitthLoadingProps extends ButtonProps, PropsWithChildren {
  loading?: boolean
  loadingChildren?: any
  form?: UseFormReturn
}
