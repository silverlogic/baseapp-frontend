'use client'

import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { usePreloadedQuery } from 'react-relay'

import { GroupDetailsQuery } from '../../common'
import Body from './Body'
import Header from './Header'
import { ProfileSummaryProps } from './types'

const ProfileSummary: FC<ProfileSummaryProps> = ({ onBackButtonClicked, queryRef }) => {
  const data = usePreloadedQuery(GroupDetailsQuery, queryRef)

  if (!data.chatRoom) {
    return <LoadingState />
  }
  return (
    <>
      <Header onBackButtonClicked={onBackButtonClicked} />
      <Body chatRoomRef={data.chatRoom} />
    </>
  )
}

const SuspendedProfileSummary: FC<ProfileSummaryProps> = ({ onBackButtonClicked, ...props }) => (
  <Suspense
    fallback={
      <>
        <Header onBackButtonClicked={onBackButtonClicked} />
        <LoadingState />
      </>
    }
  >
    <ProfileSummary onBackButtonClicked={onBackButtonClicked} {...props} />
  </Suspense>
)

export default SuspendedProfileSummary
