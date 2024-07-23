import { FieldPath, FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type Fields = FieldPath<any>

type RelayMutationErrors =
  | ReadonlyArray<
      | {
          readonly field: string
          readonly messages: ReadonlyArray<string>
        }
      | null
      | undefined
    >
  | null
  | undefined

// TODO: move to @baseapp-frontend/utils package
export const setFormRelayErrors = <T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: RelayMutationErrors,
) => {
  if (errors?.length) {
    errors.forEach((error) => {
      const errorField = error?.field as Path<T> | undefined
      if (errorField && !!form.getValues(errorField)) {
        form.setError(errorField, {
          type: 'custom',
          message: error?.messages.join(', '),
        })
      }
    })
  }
}
