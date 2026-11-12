import { graphql, useLazyLoadQuery } from 'react-relay'

import { CardHoldStaffActionsForTestingQuery } from '../../../../../../../__generated__/CardHoldStaffActionsForTestingQuery.graphql'
import { CardHoldStaffActions_cardHold$key } from '../../../../../../../__generated__/CardHoldStaffActions_cardHold.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import CardHoldStaffActions from '../../../index'
import { CardHoldStaffActionsProps } from '../../../types'

const CardHoldStaffActionsForTesting = (props: Partial<CardHoldStaffActionsProps>) => {
  const data = useLazyLoadQuery<CardHoldStaffActionsForTestingQuery>(
    graphql`
      query CardHoldStaffActionsForTestingQuery @relay_test_operation {
        cardHold: node(id: "test-card-hold-id") {
          ...CardHoldStaffActions_cardHold
        }
      }
    `,
    {},
  )

  return (
    <CardHoldStaffActions
      {...props}
      cardHold={data.cardHold as CardHoldStaffActions_cardHold$key}
    />
  )
}

export default withComponentCompleteTestProviders(CardHoldStaffActionsForTesting)
