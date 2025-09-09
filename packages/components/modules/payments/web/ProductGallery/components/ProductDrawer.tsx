import { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { useMediaQuery } from '@mui/material'

import DrawerCarousel from './DrawerCarousel'
import DrawerProductDescription from './DrawerProductDescription'
import { DrawerTitle, DrawerTitleContainer, StyledDrawer } from './styled'

const ProductDrawer: FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  return (
    <StyledDrawer isMobile={isMobile} anchor="right" open={open} onClose={onClose}>
      <>
        <DrawerTitleContainer>
          <DrawerTitle variant="h6" color="textPrimary">
            Product Detail
          </DrawerTitle>
          <CloseIcon
            onClick={onClose}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
        </DrawerTitleContainer>
        <DrawerCarousel />
        <DrawerProductDescription />
      </>
    </StyledDrawer>
  )
}
export default ProductDrawer
