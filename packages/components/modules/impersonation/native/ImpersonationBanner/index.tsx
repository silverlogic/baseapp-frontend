import { FC, ReactNode } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage, useIntl } from 'react-intl'

import {
  IMPERSONATION_BANNER_MESSAGES as MESSAGES,
  IMPERSONATION_BANNER_SEPARATOR as SEPARATOR,
  formatRemainingTime,
  useImpersonationBanner,
} from '../../common'
import { createStyles } from './styles'
import { ImpersonationBannerProps } from './types'

const renderName = (chunks: ReactNode[]) => <Text variant="subtitle2">{chunks}</Text>

/**
 * Shows, while an impersonation session runs, who is being impersonated, how long the session has
 * left and a button that ends it. Renders nothing outside a session.
 */
const ImpersonationBanner: FC<ImpersonationBannerProps> = ({
  endButtonLabel,
  style,
  ...options
}) => {
  const intl = useIntl()
  const theme = useTheme()
  const styles = createStyles(theme)
  const { user, session, remainingMs, endImpersonation, isEnding } = useImpersonationBanner(options)

  if (!session) return null

  const impersonatorName = session.impersonator?.fullName

  return (
    <View
      style={[styles.container, style]}
      accessibilityLabel={intl.formatMessage(MESSAGES.regionLabel)}
    >
      <Text variant="body2" style={styles.message}>
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
              values={{ remaining: formatRemainingTime(remainingMs) }}
            />
          </>
        )}
      </Text>
      <Button
        size="small"
        mode="contained"
        color="inherit"
        onPress={endImpersonation}
        disabled={isEnding}
      >
        {endButtonLabel ?? intl.formatMessage(MESSAGES.endSession)}
      </Button>
    </View>
  )
}

export default ImpersonationBanner
