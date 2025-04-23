import { UseFormReturn } from 'react-hook-form'

export interface ContentPostCreateForm {
  content: string
  images?: File[] | Blob[]
  isReactionsEnabled: boolean
}

export interface ContentPostUpdateForm {
  id: string
  content: string
  images?: string[] | File[] | Blob[]
  isReactionsEnabled: boolean
}

export type UploadableContentPostFiles = {
  [key: `images.${number}`]: File | Blob
}

export interface PostFormProps {
  form: UseFormReturn<ContentPostCreateForm>
  onSubmit: () => void
  isSaving: boolean
  onCancel: () => void
}
