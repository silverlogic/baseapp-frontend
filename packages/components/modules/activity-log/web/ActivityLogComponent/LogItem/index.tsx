import { FC } from 'react'

import { Box, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'

import { getUpdateMessage } from '../utils'
import { VERB_MESSAGES } from './constants'
import { LogDiff, LogItemProps } from './types'

const LogItem: FC<LogItemProps> = ({ log, sx }) => {
  const theme = useTheme()
  const intl = useIntl()
  if (!log?.verb) return null

  const getLogMessage = (verb: string, diff?: LogDiff) => {
    if (diff) return getUpdateMessage(verb, diff, intl)
    const message = VERB_MESSAGES[verb as keyof typeof VERB_MESSAGES]
    return message ? intl.formatMessage(message) : verb
  }

  const diff = log.events?.edges?.[0]?.node?.diff ?? null
  const displayText = getLogMessage(log.verb, diff)

  return (
    <Box
      sx={sx}
      display="flex"
      alignItems="center"
      borderLeft={`1px solid ${theme.palette.text.disabled}`}
      marginLeft="20px"
    >
      <Typography ml="30px" lineHeight="22px" color={theme.palette.text.secondary} variant="body2">
        {displayText}
      </Typography>
    </Box>
  )
}

export default LogItem
