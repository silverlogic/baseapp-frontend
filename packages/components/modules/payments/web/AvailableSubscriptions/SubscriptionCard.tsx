import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, Chip, Typography } from '@mui/material'
import Image from 'next/image'

import { SubscriptionCardWrapper } from './styled'
import { SubscriptionCardProps } from './types'

const SubscriptionCard = ({
  sub,
  isActive,
  smDown,
  selectedTerm,
  onManageClick,
  onSubscribeClick,
}: SubscriptionCardProps) => {
  const dolarPrice = Math.floor((sub.defaultPrice?.unitAmount ?? 0) / 100)
  const centsPrice = ((sub.defaultPrice?.unitAmount ?? 0) % 100).toString().padStart(2, '0')

  return (
    <SubscriptionCardWrapper key={sub.id} smDown={smDown}>
      {sub?.images?.length > 0 && (
        <Image src={sub.images[0] ?? ''} alt={sub.name} width={28} height={28} />
      )}
      <Box display="flex" gap={1} alignItems="flex-end">
        <Typography variant="h4">{sub.name}</Typography>
        {isActive && <Chip label="Active" color="success" variant="soft" />}
      </Box>
      <Box display="flex" gap={1} alignItems="flex-end">
        <Typography variant="h4" color="text.secondary">
          $
        </Typography>
        <Typography variant="h2">{dolarPrice}</Typography>
        <Typography variant="body1">.{centsPrice}</Typography>
        <Typography variant="body1" color="text.secondary">
          USD/{selectedTerm}
        </Typography>
      </Box>
      <Typography variant="body2">{sub.description}</Typography>
      {isActive ? (
        <Button variant="soft" color="inherit" onClick={onManageClick}>
          Manage Subscription
        </Button>
      ) : (
        <Button variant="contained" color="inherit" onClick={onSubscribeClick}>
          Subscribe
        </Button>
      )}
      <Box display="flex" flexDirection="column" gap={2}>
        {sub.marketingFeatures?.map((feature) => (
          <Typography variant="body2" color="text.secondary" key={feature.name}>
            <CheckMarkIcon color="inherit" /> {feature.name}
          </Typography>
        ))}
      </Box>
    </SubscriptionCardWrapper>
  )
}

export default SubscriptionCard
