import { forEach, get, isArray } from 'lodash'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export const setFormAllAuthApiErrors = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
  err: any,
) => {
  if (err.response?.data && typeof err.response.data === 'object') {
    const errors = get(err.response.data, 'errors', [])
    if (isArray(errors)) {
      forEach(errors, (error) => {
        form.setError(error.param, { type: 'manual', message: error.message })
      })
    }
  }
}
