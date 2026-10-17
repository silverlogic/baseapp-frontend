import { useFileUploadStore } from '../context/FileUploadProvider'

/** Upload tokens of the given files, for attaching anonymous uploads. Empty when logged in. */
export const uploadTokensFor = (fileRelayIds: string[]): string[] =>
  Array.from(useFileUploadStore.getState().files.values()).flatMap((file) =>
    file.uploadToken && file.fileRelayId && fileRelayIds.includes(file.fileRelayId)
      ? [file.uploadToken]
      : [],
  )
