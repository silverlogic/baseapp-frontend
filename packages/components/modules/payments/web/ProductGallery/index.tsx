import { FC } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { useMediaQuery } from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Product as ProductType } from '../types'
import Product from './Product'
import ProductDrawer from './ProductDrawer'
import { useProductGalleryStore } from './store'
import { GalleryContainer, GridItem, StyledGrid } from './styled'

const ProductGallery: FC = () => {
  const { setSelectedProduct, selectedProduct } = useProductGalleryStore()
  const { useListProducts } = useStripeHook()
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useListProducts()

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  if (isLoadingProducts) {
    return <LoadingState />
  }
  if (isErrorProducts) {
    return <div>Error loading products.</div>
  }
  if (!products || products.data.length === 0) {
    return <div>No products available.</div>
  }
  return (
    <>
      <GalleryContainer isMobile={isMobile}>
        <StyledGrid isMobile={isMobile}>
          {products.data.map((product: ProductType) => (
            <GridItem key={product.id}>
              <Product product={product} />
            </GridItem>
          ))}
        </StyledGrid>
      </GalleryContainer>
      <ProductDrawer
        open={!!selectedProduct}
        onClose={() => {
          setSelectedProduct(null)
        }}
      />
    </>
  )
}
export default ProductGallery
