export interface IInputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  // Accommodate arbitrary additional props coming from the `IInputProps` prop
  [arbitrary: string]: any
}

export interface IInputProps extends IInputBaseComponentProps {
  component?: React.ElementType<IInputBaseComponentProps> | React.FC<any>
  templateComponent?: React.FC<any>
  name: string
  label?: string
  helperText?: string
}

interface IImageUploadInput extends IInputProps {
  ImageProps?: IImageProps
  ImageLabelProps?: IImageLabelProps
  DeleteButtonProps?: IImageDeleteButtonProps
}

interface ImageFile {
  file: File
  imagePreviewUrl: string | ArrayBuffer | null
}
