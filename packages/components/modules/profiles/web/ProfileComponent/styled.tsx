import { ImageWithFallback } from '@baseapp-frontend/design-system/components/web/images'

import { Box, Menu, MenuProps } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const ProfileContainer = styled(Box)(({ theme }) => ({
  boxSizing: 'content-box',
  display: 'grid',
  width: '100%',
  height: '100%',
  maxWidth: 'fit-content',
  gridAutoRows: 'max-content',
  gridTemplateColumns: '1fr',
  rowGap: theme.spacing(3),
  placeSelf: 'center',
  padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`,
}))

export const ProfileContentContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'min-content auto',
  gap: theme.spacing(3),
  position: 'relative',
  top: -48,
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    position: 'static',
    top: 0,
    gridTemplateColumns: 'max-content 480px',
    gridTemplateRows: '1fr',
  },
}))

export const ProfileDescriptionContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2),
  },
}))

export const ProfileNameContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  gridTemplateColumns: '1fr',
  rowGap: theme.spacing(3),
  placeItems: 'stretch',
  justifyItems: 'center',
  [theme.breakpoints.up('sm')]: {
    gridTemplateRows: 'none',
    gridTemplateColumns: '1fr 1fr',
    columnGap: theme.spacing(3),
  },
}))

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 190,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}))

export const PageContainer = styled('div')({
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
})

export const Banner = styled(ImageWithFallback)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}))

export const ActionButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
}))

export const NameContainer = styled('div')(({ theme }) => ({
  justifySelf: 'start',
  [theme.breakpoints.down('sm')]: {
    gridColumn: '1 / -1',
    justifySelf: 'center',
  },
}))

export const FollowCountsContainer = styled('div')({
  display: 'flex',
  justifySelf: 'stretch',
  width: '100%',
})

export const CountContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'withDivider',
})<{ withDivider?: boolean }>(({ theme, withDivider }) => ({
  flexGrow: 1,
  textAlign: 'center',
  ...(withDivider && { borderRight: `1px dashed ${theme.palette.divider}` }),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

export const Biography = styled('p')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}))

export const ActionsContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'auto min-content',
  [theme.breakpoints.up('sm')]: {
    gridColumnStart: 2,
    gridTemplateColumns: 'fit-content min-content',
    justifyContent: 'flex-end',
  },
}))
