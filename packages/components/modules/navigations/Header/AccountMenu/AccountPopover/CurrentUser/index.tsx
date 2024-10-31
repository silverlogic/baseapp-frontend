import { FC } from 'react'

import { User, useJWTUser } from '@baseapp-frontend/authentication'
import { JWTContent, joinWithSeparator } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'

import { PopoverContentBox } from '../styled'

const CurrentUser: FC = () => {
  const { user } = useJWTUser<User & JWTContent>()

  if (!user) {
    return null
  }

  return (
    <PopoverContentBox>
      <Typography component="p" variant="subtitle2" noWrap>
        {joinWithSeparator([user?.firstName, user?.lastName])}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
        {user?.email}
      </Typography>
    </PopoverContentBox>
  )
}

export default CurrentUser
