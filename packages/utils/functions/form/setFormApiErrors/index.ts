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
  let errorObject
  if (err.response?.data && typeof err.response.data === 'object') {
    errorObject = err.response?.data
  } else if (err.message) {
    try {
      errorObject = JSON.parse(err.message)
    } catch (parsingError) {
      // Error message is not a JSON object, no further action taken
    }
  }

  if (errorObject) {
    map(entries(errorObject), ([key, errors]) => {
      const fieldKey = key as Path<TFieldValues>
      const errorMessage = head(errors as string[])
      if (form.getValues(fieldKey) !== undefined && typeof errorMessage === 'string') {
        form.setError(fieldKey, { type: 'manual', message: errorMessage })
      }
    })
  }
}
