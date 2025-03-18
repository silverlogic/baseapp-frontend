import { styled } from '@mui/material/styles'

export const BannerButtonsContainer = styled('div')<{ enableRemove: boolean }>(
  ({ theme, enableRemove = false }) => ({
    display: 'grid',
    gridTemplateColumns: enableRemove ? '1fr 1fr' : '1fr',
    gridTemplateRows: '1fr',
    gap: theme.spacing(2),
    placeSelf: enableRemove ? 'inherit' : 'center',
  }),
)
