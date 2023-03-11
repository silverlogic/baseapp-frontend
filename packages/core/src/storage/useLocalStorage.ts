// source: https://usehooks.com/useLocalStorage/
import { useState } from 'react'

export function useLocalStorage<T>(
  key: string | number,
  initialValue: T,
): readonly [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  // <T> is the type of the value

  // Use example:

  // Similar to useState but first arg is key to the value in local storage.
  // const [name, setName] = useLocalStorage<string>("name", "Bob");
  // const [items, setItems] = useLocalStorage<string[]>("items", ["t-shirt", "pants"]);

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(String(key))
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(error) // eslint-disable-line no-console
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        // eslint-disable-next-line @typescript-eslint/ban-types
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(String(key), JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error) // eslint-disable-line no-console
    }
  }
  return [storedValue, setValue] as const
}
