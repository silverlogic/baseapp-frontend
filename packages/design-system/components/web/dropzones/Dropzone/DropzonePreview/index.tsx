import { FC, useEffect, useState } from 'react'

import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material'

import { FileWrapper, RemoveFileButton } from '../styled'
import { DropzonePreviewProps } from '../types'

const DropzonePreview: FC<DropzonePreviewProps> = ({
  isMini = true,
  file,
  handleRemoveFile,
  onFileClick,
}) => {
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof file !== 'string') {
      const url = URL.createObjectURL(file)
      setObjectUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    return undefined
  }, [file])

  const imageUrl = typeof file === 'string' ? file : objectUrl

  return (
    <FileWrapper isMini={isMini}>
      <button style={{ height: '100%' }} type="button" onClick={() => onFileClick?.(file)}>
        <img
          src={imageUrl}
          alt={typeof file !== 'string' ? (file as File).name : undefined}
          width={isMini ? 72 : undefined}
          height={isMini ? 72 : undefined}
          style={
            isMini
              ? { objectFit: 'cover', borderRadius: '8px', height: '100%' }
              : { maxHeight: '200px', maxWidth: '100%' }
          }
        />
      </button>

      <RemoveFileButton aria-label="Remove file" onClick={handleRemoveFile}>
        <CloseRoundedIcon sx={{ color: 'white', width: '20px', height: '20px' }} />
      </RemoveFileButton>
    </FileWrapper>
  )
}

export default DropzonePreview
