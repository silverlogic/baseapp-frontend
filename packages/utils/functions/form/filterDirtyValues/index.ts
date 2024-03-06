import keys from 'lodash/keys'
import pick from 'lodash/pick'
import { FieldValues } from 'react-hook-form'

/**
 * Filter dirty values from a form, based on the current values and the dirty fields.
 *
 * @example
 * const values = {
 *  name: 'John Doe',
 *  age: 20,
 *  email: 'johndoe@email.com'
 * }
 *
 * const dirtyFields = {
 *  name: true,
 *  age: false,
 *  email: true
 * }
 *
 * const dirtyValues = filterDirtyValues(values, dirtyFields)
 * console.log(dirtyValues) // { name: 'John Doe', email: 'johndoe@email.com' }
 */
export const filterDirtyValues = <T extends FieldValues>({
  values,
  dirtyFields,
}: {
  values: T
  dirtyFields: Partial<Record<keyof T, boolean | any>>
}) => {
  const dirtyKeys = keys(dirtyFields).filter((key) => dirtyFields[key])
  const filteredValues = pick(values, dirtyKeys)

  return filteredValues
}
