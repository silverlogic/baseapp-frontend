import { FC } from 'react'

import { LoadMoreFn, RefetchFn } from 'react-relay'

import { SocialInputProps } from '../../../__shared__/web'

export interface SendMessageProps {
  roomId: string
  chatRoomMembers?: readonly any[] | any[]
  SocialInput?: FC<SocialInputProps>
  SocialInputProps?: Partial<SocialInputProps>
  loadNext?: LoadMoreFn<any>
  isLoadingNext?: boolean
  hasNext?: boolean
  refetch?: RefetchFn<any>
}
