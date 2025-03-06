import type { MenuItemProps, SelectProps, TypographyProps } from '@mui/material'
import type { CountryIso2, ParsedCountry } from 'react-international-phone'

import { TextFieldProps } from '../TextField/types'

export interface CountrySelectProps {
  country: ParsedCountry
  setCountry: (iso2: CountryIso2) => void
  selectProps?: SelectProps
  countryNameProps?: TypographyProps
  countryDialCodeProps?: TypographyProps
  optionProps?: MenuItemProps
}

export interface PhoneNumberProps extends Omit<CountrySelectProps, 'country' | 'setCountry'> {
  value?: string
  onChange?: (phone: string) => void
  defaultCountry?: CountryIso2
}

export type PhoneNumberFieldProps = TextFieldProps & PhoneNumberProps
