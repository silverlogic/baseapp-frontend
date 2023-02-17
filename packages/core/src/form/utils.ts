import { UseFormReturn } from 'react-hook-form'

export const setFormApiErrors = (form: UseFormReturn, err: any) => {
  Object.entries(err?.response?.data ?? {}).map(
    ([key, errors]) => form.setError(key, { type: 'manual', message: (errors as string[])[0] }), // we asume that there will be only one error per field
  )
}
