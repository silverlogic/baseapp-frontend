import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../../constants'
import { SubscriptionCardWrapper } from '../styled'
import { SubscriptionCardProps } from '../types'
import { PRICE_SEGMENT_TYPOGRAPHY } from './constants'
import { getPriceSegments } from './utils'

const SubscriptionCard = ({
  sub,
  isActive,
  smDown,
  selectedTerm,
  manageHref,
  subscribeHref,
}: SubscriptionCardProps) => {
  const intl = useIntl()
  const priceParts = intl.formatNumberToParts((sub.defaultPrice?.unitAmount ?? 0) / 100, {
    style: 'currency',
    currency: 'USD',
  })
  const priceSegments = getPriceSegments(priceParts)
  const marketingFeatures = sub.marketingFeatures ?? []

  return (
    <SubscriptionCardWrapper key={sub.id} smDown={smDown}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sub?.images?.length > 0 && (
          <Image src={sub.images[0] ?? ''} alt={sub.name} width={28} height={28} />
        )}
        <Box display="flex" gap={1} alignItems="flex-end">
          <Typography variant="h4">{sub.name}</Typography>
          {isActive && (
            <Chip
              label={intl.formatMessage(PAYMENTS_MESSAGES.active)}
              color="success"
              variant="soft"
            />
          )}
        </Box>
        <Box display="flex" gap={1} alignItems="flex-end">
          {priceSegments.map(({ style, value }) => (
            <Typography key={style} {...PRICE_SEGMENT_TYPOGRAPHY[style]}>
              {value}
            </Typography>
          ))}
          <Typography variant="body1" color="text.secondary">
            {selectedTerm === 'yearly' ? (
              <FormattedMessage id="payments.plans.perYear" defaultMessage="USD/yearly" />
            ) : (
              <FormattedMessage id="payments.plans.perMonth" defaultMessage="USD/monthly" />
            )}
          </Typography>
        </Box>
        <Typography variant="body2">{sub.description}</Typography>
        {isActive ? (
          <Button variant="soft" color="inherit" component={Link} href={manageHref}>
            <FormattedMessage
              id="payments.plans.manageSubscription"
              defaultMessage="Manage Subscription"
            />
          </Button>
        ) : (
          <Button variant="contained" color="inherit" component={Link} href={subscribeHref}>
            <FormattedMessage id="payments.plans.subscribe" defaultMessage="Subscribe" />
          </Button>
        )}
        <Box display="flex" flexDirection="column" gap={2}>
          {marketingFeatures.map((feature) => (
            <Typography variant="body2" color="text.secondary" key={feature.name}>
              <CheckMarkIcon color="inherit" /> {feature.name}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </SubscriptionCardWrapper>
  )
}

export default SubscriptionCard
