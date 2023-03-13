import { ChangeEvent, ElementType, FC, HTMLAttributes } from 'react'

import { IControlledComponentProps } from '@baseapp-frontend/core'

import type { TextFieldProps } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'

export interface IInputBaseComponentProps
  extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  // Accommodate arbitrary additional props coming from the `IInputProps` prop
  [arbitrary: string]: any
}

export interface IInputProps extends IInputBaseComponentProps {
  component?: ElementType<IInputBaseComponentProps> | FC<any>
  form?: UseFormReturn
  templateComponent?: FC<any>
  name: string
  label?: string
  helperText?: string
  value?: string
  handleChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
}

export type ITextField = (TextFieldProps & IInputProps) | IControlledComponentProps
