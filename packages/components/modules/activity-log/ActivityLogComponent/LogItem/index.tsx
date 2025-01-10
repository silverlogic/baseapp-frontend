import { FC } from 'react'

import { Box, Typography, useTheme } from '@mui/material'

import { LogItemProps } from './types'

const verbMapping: { [key: string]: string } = {
  'comments.add_comment': 'Created a comment',
  'comments.change_comment': 'Edited a comment',
  'comments.delete_comment': 'Deleted a comment',
  'comments.reply_comment': 'Replied to a comment',
  'comments.pin_comment': 'Pinned a comment',
  'profiles.update_profile': 'Updated their profile',
  'baseapp_reactions.add_reaction': 'Added a reaction',
}

const getDisplayText = (verb: string) => verbMapping[verb] ?? verb

const LogItem: FC<LogItemProps> = ({ log, sx }) => {
  const theme = useTheme()
  if (!log?.verb) {
    return null
  }

  return (
    <Box
      sx={sx}
      display="flex"
      alignItems="center"
      borderLeft={`1px solid ${theme.palette.text.disabled}`}
      marginLeft="20px"
    >
      <Typography ml="30px" lineHeight="22px" color={theme.palette.text.secondary} variant="body2">
        {getDisplayText(log.verb)}
      </Typography>
    </Box>
  )
}

export default LogItem
