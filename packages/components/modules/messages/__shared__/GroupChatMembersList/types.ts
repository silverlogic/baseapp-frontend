import { FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'
import { WithControllerProps } from '@baseapp-frontend/utils'

import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { LoadMoreFn, RefetchFnDynamic } from 'react-relay'

import { CreateOrEditGroup, ProfileNode } from '../types'
import { ProfileCardProps } from './ProfileCard/types'
import { ProfilesListProps } from './ProfilesList/types'

export interface GroupChatMembersListProps extends PropsWithChildren {
  FORM_VALUE: Record<keyof CreateOrEditGroup, keyof CreateOrEditGroup>
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<CreateOrEditGroup>
  currentParticipants: ProfileNode[]
  connections?: ProfileNode[]
  refetch?: RefetchFnDynamic<any, any>
  connectionsLoadNext?: LoadMoreFn<any>
  connectionsHasNext?: boolean
  connectionsIsLoadingNext?: boolean
  membersLoadNext?: LoadMoreFn<any>
  membersHasNext?: boolean
  membersIsLoadingNext?: boolean
  Searchbar?: FC<SearchbarProps> | ((props: WithControllerProps<SearchbarProps>) => JSX.Element)
  SearchbarProps?: Partial<SearchbarProps>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  ConnectionsList?: FC<ProfilesListProps>
  ConnectionsListProps?: Partial<ProfilesListProps>
  MembersList?: FC<ProfilesListProps>
  MembersListProps?: Partial<ProfilesListProps>
}
