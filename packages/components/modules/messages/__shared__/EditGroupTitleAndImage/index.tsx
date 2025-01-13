import { FC } from 'react'

import { CircledAvatar, FileUploadButton, TextField } from '@baseapp-frontend/design-system'

import { Box, Button, Typography, useTheme } from '@mui/material'

import { DEFAULT_IMAGE_FORMATS, DEFAULT_IMAGE_MAX_SIZE } from './constants'
import { UploadImageContainer } from './styled'
import { EditGroupTitleAndImageProps } from './types'
import { getImageUrl } from './utils'

const EditGroupTitleAndImage: FC<EditGroupTitleAndImageProps> = ({
  control,
  FORM_VALUE,
  handleRemoveImage,
  imageError,
  isMutationInFlight,
  setValue,
  trigger,
  watch,
}) => {
  const theme = useTheme()
  const watchImage = watch(FORM_VALUE.image)
  const imageUrl = getImageUrl(watchImage)

  return (
    <Box
      sx={{
        display: 'grid',
        gap: theme.spacing(1.5),
        padding: theme.spacing(2),
      }}
    >
      <UploadImageContainer>
        <CircledAvatar src={imageUrl} width={144} height={144} hasError={!!imageError} />
        {imageError && (
          <div className="text-center">
            <Typography color="error.main" variant="caption">
              {imageError!.message}
            </Typography>
          </div>
        )}
        <FileUploadButton
          control={control}
          disabled={isMutationInFlight}
          name={FORM_VALUE.image}
          setFile={setValue}
          accept={DEFAULT_IMAGE_FORMATS}
          maxSize={DEFAULT_IMAGE_MAX_SIZE}
          label={watchImage ? 'Change Avatar' : 'Upload Avatar'}
        />
        {watchImage && (
          <Button
            variant="text"
            color="error"
            disabled={isMutationInFlight}
            onClick={handleRemoveImage}
          >
            Remove
          </Button>
        )}
      </UploadImageContainer>
      <TextField
        label="Group Name"
        control={control}
        disabled={isMutationInFlight}
        name={FORM_VALUE.title}
        className="h-[min-content]"
        onKeyUp={() => {
          trigger(FORM_VALUE.title)
        }}
      />
    </Box>
  )
}

export default EditGroupTitleAndImage
