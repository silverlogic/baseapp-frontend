export interface IImageUploadInput extends IInputProps {
  ImageProps?: IImageProps
  ImageLabelProps?: IImageLabelProps
  DeleteButtonProps?: IImageDeleteButtonProps
  images: ImageFile[]
  setImages: Dispatch<SetStateAction<never[]>>
  buttonLabel?: string
  buttonRemoveLabel?: string
  name?: string
  UploaderButtonProps?: IImageUploaderButtonProps
  error?: boolean
  helperText?: string
}

export interface ImageFile {
  file: File
  imagePreviewUrl: string | ArrayBuffer | null
}
