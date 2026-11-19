import { graphql } from 'react-relay'

export const CardHoldStaffNoticeFragmentQuery = graphql`
  fragment CardHoldStaffNotice_cardHold on CardHold {
    id
    status
    kept
    failureReason
  }
`
