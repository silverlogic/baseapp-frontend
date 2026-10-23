'use client'

import { FC } from 'react'

import { Button, Typography } from '@mui/material'

import { formatRemainingTime, useImpersonationBanner } from '../../common'
import { BannerContainer } from './styled'
import { ImpersonationBannerProps } from './types'

/**
 * Shows, while an impersonation session runs, who is being impersonated, how long the session has
 * left and a button that ends it. Renders nothing outside a session.
 */
const ImpersonationBanner: FC<ImpersonationBannerProps> = ({
  endButtonLabel = 'End session',
  ContainerProps = {},
  ...options
}) => {
  const { user, session, remainingMs, endImpersonation, isEnding } = useImpersonationBanner(options)

  if (!session) return null

  const impersonatorName = session.impersonator?.fullName

  return (
    <BannerContainer role="region" aria-label="Impersonation session" {...ContainerProps}>
      <Typography variant="body2" component="p">
        {session.readOnly ? 'Viewing as ' : 'Acting as '}
        <strong>{user?.fullName || 'another user'}</strong>
        {session.readOnly && ' (read only)'}
        {impersonatorName && ` · signed in as ${impersonatorName}`}
        {remainingMs !== null && (
          <>
            {' · ends in '}
            <time dateTime={session.expiresAt}>{formatRemainingTime(remainingMs)}</time>
          </>
        )}
      </Typography>
      <Button
        size="small"
        variant="contained"
        color="inherit"
        onClick={endImpersonation}
        disabled={isEnding}
      >
        {endButtonLabel}
      </Button>
    </BannerContainer>
  )
}

export default ImpersonationBanner
