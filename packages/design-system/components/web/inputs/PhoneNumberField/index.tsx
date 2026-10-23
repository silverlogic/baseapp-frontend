'use client'

import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { defaultCountries, usePhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import { PureTextField } from '../TextField'
import { CountrySelect } from './CountrySelect'
import { InputAdornment } from './styled'
import { PhoneNumberFieldProps } from './types'

/**
 * This is a TextField component that supports phone number formatting and validation.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Developers can freely edit this to suit the project's needs.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const PhoneNumberField: FC<PhoneNumberFieldProps> = ({
  value,
  onChange,
  defaultCountry,
  optionProps,
  selectProps,
  countryNameProps,
  countryDialCodeProps,
  // withController forwards onInputChange (an Autocomplete callback) to the wrapped field; a
  // phone input has no use for it, and spreading it onto the TextField leaks it to the DOM.
  onInputChange: _onInputChange,
  ...props
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry,
    value,
    countries: defaultCountries,
    onChange: (data: any) => {
      onChange?.(data.phone)
    },
  })

  return (
    <PureTextField
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CountrySelect
              setCountry={setCountry}
              country={country}
              selectProps={selectProps}
              countryNameProps={countryNameProps}
              countryDialCodeProps={countryDialCodeProps}
              optionProps={optionProps}
            />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default withController(PhoneNumberField)
