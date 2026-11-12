import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { formatRemainingTime, useImpersonationBanner } from '../../common'
import { createStyles } from './styles'
import { ImpersonationBannerProps } from './types'

/**
 * Shows, while an impersonation session runs, who is being impersonated, how long the session has
 * left and a button that ends it. Renders nothing outside a session.
 */
const ImpersonationBanner: FC<ImpersonationBannerProps> = ({
  endButtonLabel = 'End session',
  style,
  ...options
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const { user, session, remainingMs, endImpersonation, isEnding } = useImpersonationBanner(options)

  if (!session) return null

  const impersonatorName = session.impersonator?.fullName

  return (
    <View style={[styles.container, style]} accessibilityLabel="Impersonation session">
      <Text variant="body2" style={styles.message}>
        {session.readOnly ? 'Viewing as ' : 'Acting as '}
        <Text variant="subtitle2">{user?.fullName || 'another user'}</Text>
        {session.readOnly && ' (read only)'}
        {impersonatorName && ` · signed in as ${impersonatorName}`}
        {remainingMs !== null && ` · ends in ${formatRemainingTime(remainingMs)}`}
      </Text>
      <Button
        size="small"
        mode="contained"
        color="inherit"
        onPress={endImpersonation}
        disabled={isEnding}
      >
        {endButtonLabel}
      </Button>
    </View>
  )
}

export default ImpersonationBanner
