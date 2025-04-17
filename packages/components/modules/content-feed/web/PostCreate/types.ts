export interface ContentPostCreateForm {
  content: string
  images?: File[] | Blob[]
  isReactionsEnabled: boolean
}

export type UploadableContentPostFiles = {
  [key: `images.${number}`]: File | Blob
}
