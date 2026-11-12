import { graphql, useLazyLoadQuery } from 'react-relay'

import { CardHoldStatusLabelForTestingQuery } from '../../../../../../../__generated__/CardHoldStatusLabelForTestingQuery.graphql'
import { CardHoldStatusLabel_cardHold$key } from '../../../../../../../__generated__/CardHoldStatusLabel_cardHold.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import CardHoldStatusLabel from '../../../index'
import { CardHoldStatusLabelProps } from '../../../types'

const CardHoldStatusLabelForTesting = (props: Partial<CardHoldStatusLabelProps>) => {
  const data = useLazyLoadQuery<CardHoldStatusLabelForTestingQuery>(
    graphql`
      query CardHoldStatusLabelForTestingQuery @relay_test_operation {
        cardHold: node(id: "test-card-hold-id") {
          ...CardHoldStatusLabel_cardHold
        }
      }
    `,
    {},
  )

  return (
    <CardHoldStatusLabel {...props} cardHold={data.cardHold as CardHoldStatusLabel_cardHold$key} />
  )
}

export default withComponentCompleteTestProviders(CardHoldStatusLabelForTesting)
