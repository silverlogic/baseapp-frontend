import { Control, FieldError, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'

import { TitleAndImage } from '../types'

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
