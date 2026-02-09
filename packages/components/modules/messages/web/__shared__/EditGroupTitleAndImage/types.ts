import { UseFormReturn } from 'react-hook-form'

import { TitleAndImage } from '../../../common/types'

export interface EditGroupTitleAndImageProps {
  form: UseFormReturn<TitleAndImage>
  FORM_VALUE: Record<keyof TitleAndImage, keyof TitleAndImage>
  isMutationInFlight: boolean
}
