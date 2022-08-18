export const setFormApiErrors = (form, err) => {
  Object.entries(err?.response?.data ?? {}).map(([key, errors]) => {
    form.setError(key, { type: 'manual', message: (errors as string[])[0] }) // we asume that there will be only one error per field
  })
}
