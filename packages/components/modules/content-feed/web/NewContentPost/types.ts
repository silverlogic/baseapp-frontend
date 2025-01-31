export interface ContentPostCreateForm {
  content: string
  images?: string[] | File[] | Blob[]
}

export type UploadableContentPostFiles = {
  [key: `image-${number}`]: File | Blob
}
