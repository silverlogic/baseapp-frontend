import { CheckMarkIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, Chip, Typography } from '@mui/material'
import Image from 'next/image'

import { IProduct } from '../types'

const SubscriptionCard = ({
  sub,
  isActive,
  smDown,
  selectedTerm,
  onClick,
}: {
  sub: IProduct
  isActive: boolean
  smDown: boolean
  selectedTerm: string
  onClick: () => void
}) => {
  const dolarPrice = Math.floor((sub.defaultPrice?.unitAmount ?? 0) / 100)
  const centsPrice = ((sub.defaultPrice?.unitAmount ?? 0) % 100).toString().padStart(2, '0')

  return (
    <Box
      key={sub.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        padding: 2,
        gap: 2,
        width: '100%',
        minWidth: '300px',
        maxWidth: smDown ? '100%' : '300px',
        flex: '1 1 300px',
      }}
    >
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
        <Button variant="soft" color="inherit" onClick={onClick}>
          Manage Subscription
        </Button>
      ) : (
        <Button variant="contained" color="inherit">
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
    </Box>
  )
}

export default SubscriptionCard
