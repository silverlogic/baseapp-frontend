import { Select as MUISelect, SelectProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Select = styled((props) => <MUISelect {...props} />)<SelectProps>(({ theme }) => ({
  width: 'max-content',
  fieldset: {
    display: 'none',
  },
  '&.Mui-focused:has(div[aria-expanded="false"])': {
    fieldset: {
      display: 'block',
    },
  },
  '.MuiSelect-select': {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1 / 4, 1),
    },
  },
  svg: {
    right: 0,
  },
}))

export const ContryTitle = styled((props) => <Typography {...props} />)<TypographyProps>(
  ({ theme }) => ({
    margin: theme.spacing(0, 1),
  }),
)
