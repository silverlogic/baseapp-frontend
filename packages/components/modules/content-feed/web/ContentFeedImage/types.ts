import { UseFormReturn } from 'react-hook-form'

type ContentFeedForm = {
  content: string
  images: File[]
}

export interface IContentFeedImageProps {
  form: UseFormReturn<ContentFeedForm, any, ContentFeedForm>
}
