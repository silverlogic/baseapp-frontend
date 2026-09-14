import { FieldPath, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { MutationPayloadErrors } from '../../relay/getMutationErrorMessage'

export type Fields = FieldPath<any>

export const setFormRelayErrors = <T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: MutationPayloadErrors,
) => {
  if (errors?.length) {
    errors.forEach((error) => {
      const errorField = error?.field as Path<T> | undefined
      if (errorField && form.getValues(errorField) !== undefined) {
        form.setError(errorField, {
          type: 'custom',
          message:
            error?.messages
              ?.map((message) => message?.trim())
              .filter(Boolean)
              .join(', ') || DEFAULT_ERROR_MESSAGE,
        })
      }
    })
  }
}
