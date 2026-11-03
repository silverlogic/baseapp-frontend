'use client'

import { FC, Suspense, useEffect, useState } from 'react'

import { hasImpersonatorTokens } from '@baseapp-frontend/authentication'

import { useLazyLoadQuery } from 'react-relay'

import { ImpersonationBannerQuery as ImpersonationBannerQueryType } from '../../../../__generated__/ImpersonationBannerQuery.graphql'
import { ImpersonationBannerQuery } from '../../common'
import ImpersonationBanner from '../ImpersonationBanner'
import { CurrentUserImpersonationBannerProps } from './types'

const ImpersonationBannerWithMe: FC<CurrentUserImpersonationBannerProps> = (props) => {
  const { me } = useLazyLoadQuery<ImpersonationBannerQueryType>(
    ImpersonationBannerQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  )

  return <ImpersonationBanner {...props} user={me} />
}

/**
 * `ImpersonationBanner` for the signed-in user, ready to mount once in a root layout. It queries
 * `me` only while this browser holds an impersonator's kept-aside tokens, so it costs nothing
 * outside a session.
 */
const CurrentUserImpersonationBanner: FC<CurrentUserImpersonationBannerProps> = (props) => {
  const { impersonatorAccessKeyName, impersonatorRefreshKeyName } = props
  const [isImpersonating, setIsImpersonating] = useState(false)

  // read after mount, so the server render and the first client render match
  useEffect(() => {
    setIsImpersonating(
      hasImpersonatorTokens({ impersonatorAccessKeyName, impersonatorRefreshKeyName }),
    )
  }, [impersonatorAccessKeyName, impersonatorRefreshKeyName])

  if (!isImpersonating) return null

  return (
    <Suspense fallback={null}>
      <ImpersonationBannerWithMe {...props} />
    </Suspense>
  )
}

export default CurrentUserImpersonationBanner
