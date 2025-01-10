import { Control, FieldError, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'

export interface EditGroupTitleAndImageProps {
  control: Control<TitleAndImage, any>
  FORM_VALUE: Record<keyof TitleAndImage, keyof TitleAndImage>
  handleRemoveImage: () => void
  imageError: FieldError | undefined
  isMutationInFlight: boolean
  setValue: UseFormSetValue<TitleAndImage>
  trigger: UseFormTrigger<TitleAndImage>
  watch: UseFormWatch<TitleAndImage>
}

export interface TitleAndImage {
  title: string
  image?: string | File | Blob | null
}
