'use client'

import { ChangeEvent, FC } from 'react'

import { useDebounce } from '@baseapp-frontend/utils'

import { CircularProgress, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'

import Iconify from '../Iconify'
import { IconButton } from '../buttons'
import { TextField } from '../inputs'
import { SearchbarProps } from './types'

const Searchbar: FC<SearchbarProps> = ({
  startTransition,
  refetch,
  isPending,
  sx,
  InputProps,
  ...props
}) => {
  const { control, watch, reset } = useForm({ defaultValues: { search: '' } })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ q: value })
    })
  }

  const handleReset = () => {
    startTransition(() => {
      reset()
      refetch({ q: '' })
    })
  }
  const watchSearch = watch('search')

  const { debouncedFunction: handleDebouncedChange } = useDebounce(handleChange)

  return (
    <TextField
      variant="filled"
      placeholder="Search"
      onChange={handleDebouncedChange}
      sx={{
        '& .MuiFormControl-root': {
          maxHeight: '45px',
        },
        ...sx,
      }}
      control={control}
      name="search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isPending ? (
              <Box
                sx={{
                  display: 'flex',
                  marginRight: '4px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={16} />
              </Box>
            ) : (
              <Iconify icon="eva:search-fill" />
            )}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {watchSearch ? (
              <IconButton onClick={handleReset}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            ) : (
              <div />
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
