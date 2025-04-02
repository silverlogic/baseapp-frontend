import { FC } from 'react'

import { PreloadedQuery } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { BodyProps } from './Body/types'
import { HeaderProps } from './Header/types'
import { ProfileCardProps } from './ProfileCard/types'

export type GroupChatDetailsProps = {
  Body?: FC<BodyProps>
  BodyProps?: Partial<BodyProps>
  Header?: FC<HeaderProps>
  HeaderProps?: Partial<HeaderProps>
  onBackButtonClicked: () => void
  onEditButtonClicked: () => void
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
