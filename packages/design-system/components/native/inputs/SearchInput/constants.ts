export const FORM_VALUES = {
  search: 'search',
} as const

export type SearchInputFormValues = {
  [FORM_VALUES.search]: string
}

export const DEFAULT_FORM_VALUES: SearchInputFormValues = {
  [FORM_VALUES.search]: '',
}
