import { ReactNode } from 'react'

import { Typography } from '@mui/material'

export const renderReplyingToLabel = (chunks: ReactNode[]) => (
  <Typography variant="body2" color="text.secondary">
    {chunks}
  </Typography>
)
