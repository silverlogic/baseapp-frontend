export type DownloadHandler = (fileUrl: string, fileName?: string) => void | Promise<void>

export interface UseFileDownloadLogicParams {
  downloadHandler: DownloadHandler
  onDownloadStart?: () => void
  onDownloadComplete?: () => void
  onError?: (error: Error) => void
}

export interface UseFileDownloadLogicReturn {
  handleDownload: (fileUrl: string | null | undefined, fileName?: string) => Promise<void>
}
