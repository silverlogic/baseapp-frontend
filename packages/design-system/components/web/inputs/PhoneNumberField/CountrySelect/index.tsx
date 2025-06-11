import { FC } from 'react'

import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import {
  CountryData,
  CountryIso2,
  FlagImage,
  defaultCountries,
  parseCountry,
} from 'react-international-phone'

import { CountrySelectProps } from '../types'
import { CountryTitle, Select as StyledSelect } from './styled'

export const CountrySelect: FC<CountrySelectProps> = ({
  country,
  setCountry,
  selectProps,
  countryNameProps,
  countryDialCodeProps,
  optionProps,
}) => {
  const handleChange = (event: SelectChangeEvent<CountryIso2>) => {
    setCountry(event.target.value as CountryIso2)
  }

  const renderValue = (value: CountryIso2) => <FlagImage iso2={value} />

  return (
    <StyledSelect
      variant="outlined"
      MenuProps={{
        style: {
          height: '300px',
          width: '360px',
          top: '10px',
          left: '-34px',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      }}
      {...selectProps}
      value={country.iso2}
      onChange={handleChange}
      renderValue={renderValue}
    >
      {defaultCountries.map((c: CountryData) => {
        const defaultCountry = parseCountry(c)
        return (
          <MenuItem {...optionProps} key={defaultCountry.iso2} value={defaultCountry.iso2}>
            <FlagImage iso2={defaultCountry.iso2} />
            <CountryTitle {...countryNameProps}>{defaultCountry.name}</CountryTitle>
            <Typography {...countryDialCodeProps}>+{defaultCountry.dialCode}</Typography>
          </MenuItem>
        )
      })}
    </StyledSelect>
  )
}
