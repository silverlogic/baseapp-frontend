import { FC } from 'react'

import { MenuItem, Typography } from '@mui/material'
import { CountryIso2, FlagImage, defaultCountries, parseCountry } from 'react-international-phone'

import { CountrySelectProps } from '../types'
import { ContryTitle, Select as StyledSelect } from './styled'

export const CountrySelect: FC<CountrySelectProps> = ({
  country,
  setCountry,
  selectProps,
  countryNameProps,
  countryDialCodeProps,
  optionProps,
}) => (
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
    onChange={(event) => setCountry(event.target.value as CountryIso2)}
    renderValue={(value) => <FlagImage iso2={value as CountryIso2} />}
  >
    {defaultCountries.map((c: any) => {
      const defaultCountry = parseCountry(c)
      return (
        <MenuItem {...optionProps} key={defaultCountry.iso2} value={defaultCountry.iso2}>
          <FlagImage iso2={defaultCountry.iso2} />
          <ContryTitle {...countryNameProps}>{defaultCountry.name}</ContryTitle>
          <Typography {...countryDialCodeProps}>+{defaultCountry.dialCode}</Typography>
        </MenuItem>
      )
    })}
  </StyledSelect>
)
