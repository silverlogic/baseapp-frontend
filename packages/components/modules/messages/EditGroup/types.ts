import { PropsWithChildren } from 'react'

import { PreloadedQuery } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'

export interface EditGroupProps extends PropsWithChildren {
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  remotePatternsHostName?: string
  roomId: string
  onValidSubmission: () => void
  onCancellation: () => void
}

export interface EditGroupUpload {
  title: string
  addParticipants?: any[]
  removeParticipants?: any[]
  image?: string | File | Blob | null
}