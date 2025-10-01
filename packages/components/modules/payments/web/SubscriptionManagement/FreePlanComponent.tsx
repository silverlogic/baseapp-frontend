import { Check } from '@mui/icons-material'
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

import { RowFlexContainer, SubscriptionPlanContainer } from './styled'

const FreePlanComponent = ({ onClickChangePlan }: { onClickChangePlan: () => void }) => {
  const freeFeatures = [
    'Access to core features',
    'Limited storage space',
    'Standard support',
    'No commitment required',
  ]
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" component="h2">
        Subscription
      </Typography>
      <SubscriptionPlanContainer>
        <RowFlexContainer>
          <Typography variant="h4" component="p">
            Free
          </Typography>
        </RowFlexContainer>
        <Typography variant="body1" component="p">
          Enjoy essential access to the platform at no cost. Perfect for exploring basic features
          and getting started.
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
        onClick={onClickChangePlan}
        sx={{
          alignSelf: 'flex-end',
          width: 'fit-content',
        }}
      >
        Change Plan
      </Button>
    </Box>
  )
}

export default FreePlanComponent
