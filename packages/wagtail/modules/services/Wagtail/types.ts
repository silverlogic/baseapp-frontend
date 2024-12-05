export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

export interface ListData<T> {
  meta: ListMeta
  items: T[]
}

export interface ListMeta {
  totalCount: number
  totalPages: number
  pageSize: number
  currentPage: number
}

export interface ImageRecordItem {
  id: number
  downloadUrl: string
  imageSizes: ImageSizes
  altText?: string
}

export interface ImageSizes {
  small: ImageData
  medium: ImageData
  mediumSquare: ImageData
  full: ImageData
}

export interface ImageData {
  width: number
  height: number
  imageUrl: string
}
