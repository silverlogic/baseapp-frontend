'use client'

import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { useChatRoom } from '../../common'
import Body from './Body'
import Header from './Header'
import { ProfileSummaryProps } from './types'

const ProfileSummary: FC<ProfileSummaryProps> = ({ onBackButtonClicked }) => {
  const { singleChatProfileDetails } = useChatRoom()
  const { imageUrl, name, username, biography, pk } = singleChatProfileDetails || {}

  return (
    <>
      <Header onBackButtonClicked={onBackButtonClicked} />
      <Body
        name={name}
        avatar={imageUrl ?? ''}
        username={username ?? ''}
        biography={biography ?? ''}
        pk={pk ?? undefined}
      />
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
