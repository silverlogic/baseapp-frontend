// file destinated for typescript helpers

export type ValueOf<T> = T[keyof T]

export type KeyofObject<T> = { [key in keyof T]: keyof T }

export type RequireAllOrNone<T> = Required<T> | Partial<Record<keyof T, undefined>>
