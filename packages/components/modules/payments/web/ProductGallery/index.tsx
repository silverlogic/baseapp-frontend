import { FC } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Grid, useMediaQuery } from '@mui/material'

import useStripeHook from '../hooks/useStripeHook'
import { Product as ProductType } from '../types'
import Product from './components/Product'
import ProductDrawer from './components/ProductDrawer'
import { GalleryContainer } from './components/styled'
import { useProductGalleryStore } from './store'

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
        <Grid container spacing={1}>
          {products.data.map((product: ProductType) => (
            <Grid item xs={6} sm={4} md={4} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
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
