import { FC } from 'react'

import { Typography } from '@mui/material'

import { Product as ProductType } from '../../types'
import { formatPrice } from '../../utils'
import { useProductGalleryStore } from '../store'
import { DrawerDescriptionContainer, PackageContainer, StyledChip, Title } from './styled'

const DrawerProductDescription: FC = () => {
  const { selectedProduct } = useProductGalleryStore()
  const product: ProductType | null = selectedProduct
  return (
    <DrawerDescriptionContainer>
      <Title sx={{ lineHeight: '28px' }} variant="h6" color="textPrimary">
        {product?.name ?? ''}
      </Title>
      <PackageContainer>
        <Typography variant="subtitle2" color="textSecondary">
          {formatPrice(product?.defaultPrice?.unitAmount) ?? ''}
        </Typography>
        <StyledChip label="Packages" />
      </PackageContainer>
      <Typography variant="body2" color="textPrimary">
        {product?.description ?? ''}
      </Typography>
    </DrawerDescriptionContainer>
  )
}

export default DrawerProductDescription
