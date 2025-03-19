import { FC } from 'react'

import { PreloadedQuery } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { BodyProps } from './Body/types'
import { HeaderProps } from './Header/types'
import { ProfileCardProps } from './ProfileCard/types'

export type GroupChatRoomDetailProps = {
  onBackButtonClicked: () => void
  onEditButtonClicked: () => void
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  Header?: FC<HeaderProps>
  HeaderProps?: Partial<HeaderProps>
  Body?: FC<BodyProps>
  BodyProps?: Partial<BodyProps>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
