import { FC, useState } from 'react'

import { toBase64 } from '@baseapp-frontend/utils'

import { Box, Button, Card, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'

import {
  ButtonContainer,
  CancelIcon,
  DropzoneText,
  InputContainer,
  PortraitOutlinedIcon,
} from './styled'
import { DropzoneProps } from './types'

const Dropzone: FC<DropzoneProps> = ({ accept, size, storedImg, onSelect, onRemove }) => {
  const [files, setFiles] = useState<string | undefined>(storedImg)
  const getImageString = async (avatar: string | File | Blob) => {
    if (typeof avatar === 'string') return avatar.length === 0 ? avatar : undefined
    return toBase64(avatar)
  }
  const { open, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return
      const imgString = await getImageString(acceptedFiles[0])
      if (!imgString) return
      setFiles(imgString)
      onSelect(imgString, size)
    },
  })

  const handleRemove = () => {
    setFiles(undefined)
    onRemove(size)
  }

  const Input = (
    <div style={{ width: '100%' }} className="container">
      <InputContainer {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {isDragReject ? (
          <>
            <CancelIcon />
            <DropzoneText hasError>File not accepted, please choose the correct type</DropzoneText>
            <Typography variant="caption" color="text.secondary">
              Max. File Size: 15MB
            </Typography>
          </>
        ) : (
          <>
            <PortraitOutlinedIcon />
            <DropzoneText>
              <DropzoneText color="primary">Click to browse</DropzoneText> or drag and drop.
            </DropzoneText>
            <Typography variant="caption" color="text.secondary">
              Max. File Size: 15MB
            </Typography>
          </>
        )}
      </InputContainer>
    </div>
  )

  const Preview = (
    <Card>
      {files && (
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <img
            key={files}
            src={files}
            alt="preview"
            style={{ maxHeight: '200px', maxWidth: '100%' }}
          />
        </Box>
      )}
    </Card>
  )

  return (
    <div className="grid grid-rows-[1fr_min-content] gap-4">
      {files ? Preview : Input}
      <ButtonContainer>
        <Button variant="outlined" color="inherit" onClick={open} disableRipple type="button">
          Upload File
        </Button>
        {files && (
          <Button variant="text" color="error" onClick={handleRemove}>
            Remove
          </Button>
        )}
      </ButtonContainer>
    </div>
  )
}

export default Dropzone
