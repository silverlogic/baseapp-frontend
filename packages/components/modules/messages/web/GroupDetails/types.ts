import { FC } from 'react'

import { PreloadedQuery } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { ProfileCardProps } from './ProfileCard/types'

export type GroupDetailsProps = {
  onBackButtonClicked: () => void
  onEditButtonClicked: () => void
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
