export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

export interface IListData<T> {
  meta: IListMeta
  items: T[]
}

export interface IListMeta {
  totalCount: number
  totalPages: number
  pageSize: number
  currentPage: number
}

export interface IImageRecordItem {
  id: number
  downloadUrl: string
  imageSizes: IImageSizes
  altText?: string
}

export interface IImageSizes {
  small: IImageData
  medium: IImageData
  mediumSquare: IImageData
  full: IImageData
}

export interface IImageData {
  width: number
  height: number
  imageUrl: string
}
