import { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Drawer } from '@mui/material'

import DrawerCarousel from './DrawerCarousel'
import DrawerProductDescription from './DrawerProductDescription'
import { DrawerTitle, DrawerTitleContainer } from './styled'

const ProductDrawer: FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: 400,
        boxSizing: 'border-box',
      },
    }}
  >
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
  </Drawer>
)

export default ProductDrawer
