'use client'

import { ChangeEvent, FC } from 'react'

import { useDebounce } from '@baseapp-frontend/utils'

import { CircularProgress, InputAdornment } from '@mui/material'

import Iconify from '../Iconify'
import { PureTextField } from '../inputs'
import { SearchbarProps } from './types'

const Searchbar: FC<SearchbarProps> = ({
  startTransition,
  refetch,
  isPending,
  sx,
  InputProps,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const { debouncedFunction: handleDebouncedChange } = useDebounce(handleChange)

  return (
    <PureTextField
      variant="filled"
      placeholder="Search"
      onChange={handleDebouncedChange}
      sx={{
        '& .MuiFormControl-root': {
          maxHeight: '45px',
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isPending ? (
              <div className="mr-1 flex items-center justify-center">
                <CircularProgress size={16} />
              </div>
            ) : (
              <Iconify icon="eva:search-fill" />
            )}
          </InputAdornment>
        ),
        sx: {
          '& .MuiFilledInput-input': {
            height: '17px',
            paddingTop: '14px',
            paddingBottom: '14px',
            paddingRight: '14px',
            maxHeight: '17px',
          },
          '& .MuiInputAdornment-positionStart': {
            marginTop: '0 !important',
          },
        },
        ...InputProps,
      }}
      {...props}
    />
  )
}

export default Searchbar
