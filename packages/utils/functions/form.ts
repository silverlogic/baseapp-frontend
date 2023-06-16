import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const setFormApiErrors = <T extends FieldValues>(form: UseFormReturn<T>, err: any) => {
  Object.entries(err?.response ?? {}).map(
    ([key, errors]) =>
      form.setError(key as Path<T>, { type: 'manual', message: (errors as string[])[0] }), // we asume that there will be only one error per field
  )
}
