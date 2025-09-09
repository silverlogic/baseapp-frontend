import { FC } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

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
        <Grid container spacing={0} columnSpacing={0} rowSpacing={0}>
          {products.data.map((product: ProductType) => (
            <Grid
              xs={6}
              sm={4}
              md={4}
              key={product.id}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ padding: '8px', margin: '0px' }}
            >
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
