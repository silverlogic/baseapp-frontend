import type { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { useNotification } from '@baseapp-frontend/utils'

import { Linking } from 'react-native'
import { useFragment } from 'react-relay'

import { FileItemFragment } from '../../../common/graphql/fragments/FileItem'
import { useFileDownloadLogic } from '../../../common/hooks/useFileDownloadLogic'
import { getFileTypeLabel } from '../../../common/utils/formatters'
import FileChip from '../../FileChip'
import type { AttachedFileChipProps } from './types'

/** Chip for a file already attached to its target; tapping opens it in the system viewer. */
const AttachedFileChip: FC<AttachedFileChipProps> = ({
  file: fileRef,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const file = useFragment(FileItemFragment, fileRef)
  const { sendToast } = useNotification()

  const { handleDownload } = useFileDownloadLogic({
    downloadHandler: (url) => Linking.openURL(url),
    onError: () => sendToast('Could not open the file.', { type: 'error' }),
  })

  return (
    <FileChip
      name={file.fileName ?? 'File'}
      contentType={file.fileContentType}
      thumbnailUrl={file.thumbnail}
      onPress={() => handleDownload(file.url, file.fileName ?? undefined)}
      shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
      subtitle={
        <Text variant="caption" color="low">
          {getFileTypeLabel(file.fileName, file.fileContentType)}
        </Text>
      }
    />
  )
}

export default AttachedFileChip
export type { AttachedFileChipProps } from './types'
