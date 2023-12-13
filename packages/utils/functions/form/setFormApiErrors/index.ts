import entries from 'lodash/entries'
import head from 'lodash/head'
import map from 'lodash/map'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const setFormApiErrors = <T extends FieldValues>(form: UseFormReturn<T>, err: any) => {
  if (err.response?.data && typeof err.response.data === 'object') {
    map(entries(err.response.data), ([key, errors]) => {
      const fieldKey = key as Path<T>
      const errorMessage = head(errors as string[])
      if (!!form.getValues(fieldKey) && typeof errorMessage === 'string') {
        form.setError(fieldKey, { type: 'manual', message: errorMessage })
      }
    })
  }
}
