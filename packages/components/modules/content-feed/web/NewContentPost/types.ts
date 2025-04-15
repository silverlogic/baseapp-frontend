export interface ContentPostCreateForm {
  content: string
  images?: File[]
}

export type UploadableContentPostFiles = {
  [key: `images.${number}`]: File | Blob
}

export type NewContentPostProps = Record<string, never>
