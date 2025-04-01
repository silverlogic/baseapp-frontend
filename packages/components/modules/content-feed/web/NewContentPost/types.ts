export interface ContentPostCreateForm {
  content: string
  images?: File[] | Blob[]
}

export type UploadableContentPostFiles = {
  [key: `images.${number}`]: File | Blob
}

export interface INewContentPostProps {}