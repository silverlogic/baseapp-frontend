import { create } from 'zustand'

import { Product } from '../types'

interface State {
  selectedProduct: Product | null
}

interface Actions {
  setSelectedProduct: (product: Product | null) => void
}

export const useProductGalleryStore = create<State & Actions>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}))
