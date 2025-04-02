import { FC } from 'react'

import { CircledAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { FileUploadButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { TextField } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Button, Typography, useTheme } from '@mui/material'

import { DEFAULT_IMAGE_FORMATS, DEFAULT_IMAGE_MAX_SIZE } from './constants'
import { UploadImageContainer } from './styled'
import { EditGroupTitleAndImageProps } from './types'
import { getImageUrl } from './utils'

const EditGroupTitleAndImage: FC<EditGroupTitleAndImageProps> = ({
  form,
  FORM_VALUE,
  isMutationInFlight,
}) => {
  const { control, setValue, watch, getFieldState, clearErrors, trigger } = form

  const handleRemoveImage = () => {
    clearErrors(FORM_VALUE.image)
    setValue(FORM_VALUE.image, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const theme = useTheme()
  const watchImage = watch(FORM_VALUE.image)
  const imageUrl = getImageUrl(watchImage)
  const imageError = getFieldState(FORM_VALUE.image)?.error

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
              {imageError.message}
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
        inputProps={{ maxLength: 20 }}
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
