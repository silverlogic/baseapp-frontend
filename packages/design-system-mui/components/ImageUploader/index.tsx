import { FormControl, FormHelperText } from '@mui/material'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'

import type { IImageUploadInput, ImageFile } from './types'
import { ImageGroup, Image, UploaderButton, LabelGroup, ImageLabel, DeleteButton } from './styled'

function ImageUploader({
  images,
  setImages,
  buttonLabel = 'Upload Image',
  buttonRemoveLabel = 'Remove Image',
  name,
  error,
  helperText,
  ImageProps,
  ImageLabelProps,
  DeleteButtonProps,
  UploaderButtonProps,
  ...props
}: IImageUploadInput) {
  // @TODO: Add support for multiple images
  // @TODO Add formik or other form context to support form validation
  const deleteImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  function onChange(e: any): void {
    //eslint-disable-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < e.target?.files?.length; i++) {
      const file = e.target?.files[i]
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setImages([{ file: file, imagePreviewUrl: fileReader.result }])
      }
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <FormControl error={error} fullWidth>
      <UploaderButton
        component="label"
        htmlFor={'imageInput' + name}
        variant="outlined"
        color="primary"
        sx={{ display: images.length ? 'none' : 'auto' }}
        {...UploaderButtonProps}
      >
        <UploadFileOutlinedIcon sx={{ marginRight: 1 }} />
        {buttonLabel}
      </UploaderButton>
      <input
        name={name}
        id={'imageInput' + name}
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }}
        {...props}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
      {images?.map((img: ImageFile, index: number) => (
        <ImageGroup key={index}>
          <Image src={img.imagePreviewUrl as string} alt="preview" {...ImageProps} />
          <LabelGroup>
            <ImageLabel variant="caption" {...ImageLabelProps}>
              {img.file.name}
            </ImageLabel>
            <DeleteButton
              onClick={() => deleteImage(index)}
              variant="text"
              color="primary"
              {...DeleteButtonProps}
            >
              {buttonRemoveLabel}
            </DeleteButton>
          </LabelGroup>
        </ImageGroup>
      ))}
    </FormControl>
  )
}

export default ImageUploader
