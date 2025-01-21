import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

<<<<<<<< HEAD:packages/components/modules/messages/web/CreateGroup/ConnectionsList/types.ts
import { AllProfilesListPaginationQuery } from '../../../../../__generated__/AllProfilesListPaginationQuery.graphql'
import { ProfileNode } from '../../../../profiles/common'
========
import { ProfileNode } from '../../types'
>>>>>>>> 3f7d135 (feat: moved group chat list display functionality from CreateGroup into shared component GroupChatMembersList):packages/components/modules/messages/web/__shared__/GroupChatMembersList/ProfilesList/types.ts

export interface ProfilesListProps {
  profiles: ProfileNode[]
  isLoadingNext?: boolean
  hasNext?: boolean
  loadNext?: LoadMoreFn<any>
  searchValue?: string | null
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  isPending?: boolean
  label?: string
  title?: string
  renderItem: (profile: ProfileNode, isMember?: boolean) => JSX.Element | null
  SearchNotFoundState?: FC
  EmptyProfilesListState?: FC
}
