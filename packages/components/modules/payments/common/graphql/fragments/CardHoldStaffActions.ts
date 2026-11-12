import { graphql } from 'react-relay'

export const CardHoldStaffActionsFragmentQuery = graphql`
  fragment CardHoldStaffActions_cardHold on CardHold {
    id
    status
    kept
    failureReason
  }
`
