import { FC } from 'react'

import { joinWithSeparator } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

import { CurrentUserPlaceholderProps } from './types'

const CurrentUserPlaceholder: FC<CurrentUserPlaceholderProps> = ({ user }) => (
  <Box sx={{ p: 1 }}>
    <Typography component="p" variant="subtitle2" noWrap>
      {joinWithSeparator([user?.firstName, user?.lastName])}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
      {user?.email}
    </Typography>
  </Box>
)

export default CurrentUserPlaceholder
