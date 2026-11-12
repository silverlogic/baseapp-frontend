import { graphql } from 'react-relay'

export const CardHoldStatusLabelFragmentQuery = graphql`
  fragment CardHoldStatusLabel_cardHold on CardHold {
    status
    kept
  }
`
