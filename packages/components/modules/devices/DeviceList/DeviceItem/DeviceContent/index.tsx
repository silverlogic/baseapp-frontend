import { FC } from 'react'

import { DATE_FORMAT, formatDateFromApi, formatRelativeTime } from '@baseapp-frontend/utils'

import { Box, Chip, Typography } from '@mui/material'

import { DeviceContentProps } from './types'

const DeviceContent: FC<DeviceContentProps> = ({ device }) => {
  const isNew = new Date(device?.createdAt).getTime() > new Date().getTime() - 1000 * 60 * 60 * 24

  return (
    <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
      {isNew && (
        <Chip
          label="New"
          color="success"
          size="small"
          variant="soft"
          sx={{ width: 'fit-content' }}
        />
      )}
      <Typography variant="subtitle2">{device?.osFamily}</Typography>
      <Typography variant="body2">
        {device?.browserFamily} {device?.browserVersion}
        <Typography variant="caption" color="text.secondary" display="inline">
          {' '}
          {formatRelativeTime(device?.lastLogin)}
        </Typography>
      </Typography>
      <Typography variant="body2">{device?.address}</Typography>
      <Typography variant="caption" color="text.secondary">
        First Sign In
        <Typography variant="caption" color="text.primary" display="inline">
          {' '}
          {formatDateFromApi(device?.createdAt, { toFormat: DATE_FORMAT[2] })}
        </Typography>
      </Typography>
    </Box>
  )
}

export default DeviceContent
