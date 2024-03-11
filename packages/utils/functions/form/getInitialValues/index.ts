import keys from 'lodash/keys'
import pick from 'lodash/pick'

/**
 * Get initial values for a form, based on the current values and the initial values.
 *
 * @example
 * const current = {
 *  name: 'John Doe',
 *  age: 20,
 *  email: 'johndoe@email.com'
 * }
 *
 * const initial = {
 *  name: '',
 *  age: 0,
 * }
 *
 * const initialValues = getInitialValues({current, initial})
 * console.log(initialValues) // { name: 'John Doe', age: 20 }
 *
 */
export const getInitialValues = <Current extends Object, Initial extends Object>({
  current,
  initial,
}: {
  current?: Current
  initial: Initial
}) => {
  if (current) return pick(current, keys(initial))
  return initial
}
