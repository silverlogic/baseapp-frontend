import { ImageWithFallback } from '@baseapp-frontend/design-system/components/web/images'

import { styled } from '@mui/material/styles'

export const BannerButtonsContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'enableRemove',
})<{ enableRemove: boolean }>(({ theme, enableRemove = false }) => ({
  display: 'grid',
  gridTemplateColumns: enableRemove ? '1fr 1fr' : '1fr',
  gridTemplateRows: '1fr',
  gap: theme.spacing(2),
  placeSelf: enableRemove ? 'inherit' : 'center',
}))

export const Form = styled('form')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  gridTemplateRows: 'min-content auto auto auto auto',
}))

export const TwoColumnGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridTemplateRows: 'repeat(1, minmax(0, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
  },
}))

export const AvatarUploadContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateRows: '1fr min-content',
  justifyContent: 'center',
  justifyItems: 'center',
}))

export const ErrorContainer = styled('div')({
  textAlign: 'center',
})

export const FieldsContainer = styled('div')({
  display: 'grid',
  gridAutoRows: 'auto',
})

export const BannerUploadContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateRows: '1fr min-content',
  justifyContent: 'center',
}))

export const Banner = styled(ImageWithFallback)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}))

export const FooterActions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
}))
