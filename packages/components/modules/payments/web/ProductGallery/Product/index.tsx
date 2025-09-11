import { FC } from 'react'

import { useMediaQuery } from '@mui/material'

import { Product as ProductType } from '../../types'
import BuyButton from './BuyButton'
import ImageCarousel from './Carousel'
import ProductDescription from './ProductDescription'
import { ProductContainer } from './styled'

const Product: FC<{ product: ProductType }> = ({ product }) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  return (
    <ProductContainer isMobile={isMobile}>
      <ImageCarousel product={product} />
      <ProductDescription product={product} />
      <BuyButton />
    </ProductContainer>
  )
}
export default Product
