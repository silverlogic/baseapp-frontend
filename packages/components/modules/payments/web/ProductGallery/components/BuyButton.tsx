import { FC } from 'react'

import { Typography } from '@mui/material'

import { ButtonContainer, StyledButton } from './styled'

const BuyButton: FC = () => (
  <ButtonContainer>
    <StyledButton variant="contained" color="inherit" fullWidth>
      <Typography variant="button" color="primary.contrastText">
        Buy Now
      </Typography>
    </StyledButton>
  </ButtonContainer>
)
export default BuyButton
