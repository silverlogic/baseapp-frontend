import entries from 'lodash/entries'
import head from 'lodash/head'
import map from 'lodash/map'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const setFormApiErrors = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>,
  err: any,
) => {
  if (err.response?.data && typeof err.response.data === 'object') {
    map(entries(err.response.data), ([key, errors]) => {
      const fieldKey = key as Path<TFieldValues>
      const errorMessage = head(errors as string[])
      if (!!form.getValues(fieldKey) && typeof errorMessage === 'string') {
        form.setError(fieldKey, { type: 'manual', message: errorMessage })
      }
    })
  }
}
