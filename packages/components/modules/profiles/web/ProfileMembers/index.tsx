import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as UserMembersListPaginationQueryType } from '../../../../__generated__/UserMembersListPaginationQuery.graphql'
import { UserMembersListPaginationQuery } from '../../common'
import MembersList from './MembersList'
import { NUMBER_OF_MEMBERS_ON_FIRST_LOAD } from './constants'
import type { ProfileMembersProps } from './types'

const ProfileMembers: FC<ProfileMembersProps> = ({
  title = 'Members',
  subtitle,
  MembersListProps = {},
}) => {
  const { currentProfile } = useCurrentProfile()

  const data = useLazyLoadQuery<UserMembersListPaginationQueryType>(
    UserMembersListPaginationQuery,
    {
      profileId: currentProfile?.id || '',
      count: NUMBER_OF_MEMBERS_ON_FIRST_LOAD,
      orderBy: 'status',
    },
  )

  if (!data.profile) return null

  return (
    <>
      <Typography component="h4" variant="h4" mb={1}>
        {title}
      </Typography>
      <Typography component="p" variant="body2" color="text.secondary" mb={4}>
        {subtitle}
      </Typography>
      <MembersList {...MembersListProps} userRef={data?.profile} />
    </>
  )
}

export default ProfileMembers
