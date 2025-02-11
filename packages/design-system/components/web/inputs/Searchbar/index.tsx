'use client'

import { FC } from 'react'

import { withController } from '@baseapp-frontend/utils'

import { CircularProgress, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'

import IconButton from '../../buttons/IconButton'
import Iconify from '../../images/Iconify'
import { PureTextField } from '../TextField'
import { SearchbarProps } from './types'

const Searchbar: FC<SearchbarProps> = ({
  onClear,
  onChange,
  isPending,
  sx,
  InputProps,
  variant = 'filled',
  ...props
}) => (
  <PureTextField
    variant={variant}
    placeholder="Search"
    onChange={onChange}
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
          {onClear && props.value ? (
            <IconButton onClick={onClear}>
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

export default withController(Searchbar, { shouldDebounce: true })
