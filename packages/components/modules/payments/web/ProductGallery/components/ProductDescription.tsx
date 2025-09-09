import { FC } from 'react'

import { Typography, useMediaQuery } from '@mui/material'

import { Product as ProductType } from '../../types'
import { formatPrice } from '../../utils'
import { useProductGalleryStore } from '../store'
import { Description, DescriptionContainer, Title } from './styled'

const ProductDescription: FC<{ product: ProductType }> = ({ product }) => {
  const { setSelectedProduct } = useProductGalleryStore()
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  return (
    <DescriptionContainer isMobile={isMobile} onClick={() => setSelectedProduct(product)}>
      <Title variant="caption" color="textPrimary">
        {product?.name ?? ''}
      </Title>
      <Typography variant="caption" color="textSecondary">
        {formatPrice(product?.defaultPrice?.unitAmount) ?? ''}
      </Typography>
      <Description variant="caption" color="textPrimary">
        {product?.description ?? ''}
      </Description>
    </DescriptionContainer>
  )
}

export default ProductDescription
