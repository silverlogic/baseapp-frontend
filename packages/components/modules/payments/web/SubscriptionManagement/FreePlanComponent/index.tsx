import { Check } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'
import { FormattedMessage, useIntl } from 'react-intl'

import { PAYMENTS_MESSAGES } from '../../constants'
import { FREE_PLAN_FEATURE_MESSAGES } from '../constants'
import { RowFlexContainer, SubscriptionPlanContainer } from '../styled'
import { FreePlanComponentProps } from './types'

const FreePlanComponent = ({ planChangeUrl }: FreePlanComponentProps) => {
  const intl = useIntl()
  const freeFeatures = Object.values(FREE_PLAN_FEATURE_MESSAGES).map((message) =>
    intl.formatMessage(message),
  )
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" component="h2">
        <FormattedMessage {...PAYMENTS_MESSAGES.subscription} />
      </Typography>
      <SubscriptionPlanContainer>
        <RowFlexContainer>
          <Typography variant="h4" component="p">
            <FormattedMessage id="payments.freePlan.title" defaultMessage="Free" />
          </Typography>
        </RowFlexContainer>
        <Typography variant="body1" component="p">
          <FormattedMessage
            id="payments.freePlan.description"
            defaultMessage="Enjoy essential access to the platform at no cost. Perfect for exploring basic features and getting started."
          />
        </Typography>
        <Box>
          <RowFlexContainer>
            <List>
              {freeFeatures.map((feature) => (
                <ListItem sx={{ paddingLeft: 0 }} key={feature}>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </RowFlexContainer>
        </Box>
      </SubscriptionPlanContainer>
      <Button
        variant="contained"
        color="inherit"
        component={Link}
        href={planChangeUrl}
        sx={{
          alignSelf: 'flex-end',
          width: 'fit-content',
        }}
      >
        <FormattedMessage {...PAYMENTS_MESSAGES.changePlan} />
      </Button>
    </Box>
  )
}

export default FreePlanComponent
