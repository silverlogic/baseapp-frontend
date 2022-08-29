import { styled } from '@mui/material/styles'
import { Button as MuiButton, Typography } from '@mui/material'
import { FC } from 'react'

import { fontSize } from '../../styles/utils'

const UploaderButton = styled(MuiButton)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  border: `1px dashed ${theme.palette.grey[500]}`,
  borderRadius: '8px',
  height: '46px',
  color: theme.palette.grey[500],
  textTransform: 'capitalize',
})) as unknown as typeof MuiButton

const ImageGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}))

const Image = styled('img')(({ theme }) => ({
  width: '87px',
  height: '87px',
  objectFit: 'cover',
  borderRadius: theme.spacing(1),
})) as unknown as FC<JSX.IntrinsicElements['img']>

const LabelGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginLeft: theme.spacing(1),
}))

const ImageLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: fontSize(16),
  padding: theme.spacing(1),
})) as unknown as typeof Typography

const DeleteButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.warning.main,
  textDecoration: 'underline',
  textTransform: 'capitalize',
  fontSize: fontSize(14),
  '&:hover': {
    color: theme.palette.warning.light,
  },
})) as unknown as typeof MuiButton

export { UploaderButton, ImageGroup, Image, LabelGroup, ImageLabel, DeleteButton }
