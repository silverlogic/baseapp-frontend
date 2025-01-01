import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { LogItemProps } from './types'

const verbMapping: { [key: string]: string } = {
  'comments.add_comment': 'Created a comment',
  'comments.edit_comment': 'Edited a comment',
  'comments.delete_comment': 'Deleted a comment',
  'comments.reply_comment': 'Replied to a comment',
}

const getDisplayText = (verb: string) => verbMapping[verb] ?? verb

const LogItem: FC<LogItemProps> = ({ log }) => {
  if (!log?.verb) {
    return null
  }

  return (
    <Box display="flex" alignItems="center" borderLeft="1px solid #000" marginLeft="20px">
      <Typography ml="30px" variant="body2">
        {getDisplayText(log.verb)}
      </Typography>
    </Box>
  )
}

export default LogItem
