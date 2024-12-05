import { FC } from 'react'

import { User, useJWTUser } from '@baseapp-frontend/authentication'
import { JWTContent, joinWithSeparator } from '@baseapp-frontend/utils'

import { Box, Typography } from '@mui/material'

const CurrentUser: FC = () => {
  const { user } = useJWTUser<User & JWTContent>()

  if (!user) {
    return null
  }

  return (
    <Box sx={{ m: 1.5, px: 1, py: 0.75 }}>
      <Typography component="p" variant="subtitle2" noWrap>
        {joinWithSeparator([user?.firstName, user?.lastName])}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
        {user?.email}
      </Typography>
    </Box>
  )
}

export default CurrentUser
