import type { AlertColor } from '@mui/material'

type MetaToastOptions = {
  toastMessage?: string
  toastType?: AlertColor
}

type MetaErrorOptions = {
  sendErrorToast?: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: Record<string, unknown> & MetaToastOptions & MetaErrorOptions
  }
}
