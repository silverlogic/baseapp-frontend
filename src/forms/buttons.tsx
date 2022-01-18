import React from 'react'
import type { FormikProps } from 'formik'

export interface IButtonWithLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  formik: FormikProps<any>,
  isLoading?: boolean,
  children: JSX.Element[] | JSX.Element | string,
  loadingText?: string | React.FC<any>,
}

export function ButtonWithLoading({formik, isLoading = false, children, loadingText = "Loading...", ...props}: IButtonWithLoadingProps) {
  const _isLoading = formik ? formik.isSubmitting : isLoading
  return (<button disabled={_isLoading} {...props}>
    {_isLoading ? loadingText : children}
  </button>)
}
