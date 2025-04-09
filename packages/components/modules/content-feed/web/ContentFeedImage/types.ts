import { UseFormReturn } from 'react-hook-form'

export interface IContentFeedImageProps {
  form: UseFormReturn<
    {
      content: string
      images: File[]
    },
    any,
    undefined
  >
}
