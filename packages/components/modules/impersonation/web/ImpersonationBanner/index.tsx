'use client'

import { FC, ReactNode } from 'react'

import { Button, Typography } from '@mui/material'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  IMPERSONATION_BANNER_MESSAGES as MESSAGES,
  IMPERSONATION_BANNER_SEPARATOR as SEPARATOR,
  formatRemainingTime,
  useImpersonationBanner,
} from '../../common'
import { BannerContainer } from './styled'
import { ImpersonationBannerProps } from './types'

const renderName = (chunks: ReactNode[]) => <strong>{chunks}</strong>

/**
 * Shows, while an impersonation session runs, who is being impersonated, how long the session has
 * left and a button that ends it. Renders nothing outside a session.
 */
const ImpersonationBanner: FC<ImpersonationBannerProps> = ({
  endButtonLabel,
  ContainerProps = {},
  ...options
}) => {
  const intl = useIntl()
  const { user, session, remainingMs, endImpersonation, isEnding } = useImpersonationBanner(options)

  if (!session) return null

  const impersonatorName = session.impersonator?.fullName

  return (
    <BannerContainer
      role="region"
      aria-label={intl.formatMessage(MESSAGES.regionLabel)}
      {...ContainerProps}
    >
      <Typography variant="body2" component="p">
        <FormattedMessage
          {...MESSAGES.subject}
          values={{
            readOnly: String(Boolean(session.readOnly)),
            name: user?.fullName || intl.formatMessage(MESSAGES.anotherUser),
            b: renderName,
          }}
        />
        {impersonatorName && (
          <>
            {SEPARATOR}
            <FormattedMessage {...MESSAGES.signedInAs} values={{ name: impersonatorName }} />
          </>
        )}
        {remainingMs !== null && (
          <>
            {SEPARATOR}
            <FormattedMessage
              {...MESSAGES.endsIn}
              values={{
                remaining: (
                  <time dateTime={session.expiresAt}>{formatRemainingTime(remainingMs)}</time>
                ),
              }}
            />
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
        {endButtonLabel ?? intl.formatMessage(MESSAGES.endSession)}
      </Button>
    </BannerContainer>
  )
}

export default ImpersonationBanner
