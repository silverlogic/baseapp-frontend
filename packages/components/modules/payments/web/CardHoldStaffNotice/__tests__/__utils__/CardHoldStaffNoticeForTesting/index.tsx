import { graphql, useLazyLoadQuery } from 'react-relay'

import { CardHoldStaffNoticeForTestingQuery } from '../../../../../../../__generated__/CardHoldStaffNoticeForTestingQuery.graphql'
import { CardHoldStaffNotice_cardHold$key } from '../../../../../../../__generated__/CardHoldStaffNotice_cardHold.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import CardHoldStaffNotice from '../../../index'
import { CardHoldStaffNoticeProps } from '../../../types'

const CardHoldStaffNoticeForTesting = (props: Partial<CardHoldStaffNoticeProps>) => {
  const data = useLazyLoadQuery<CardHoldStaffNoticeForTestingQuery>(
    graphql`
      query CardHoldStaffNoticeForTestingQuery @relay_test_operation {
        cardHold: node(id: "test-card-hold-id") {
          ...CardHoldStaffNotice_cardHold
        }
      }
    `,
    {},
  )

  return (
    <CardHoldStaffNotice {...props} cardHold={data.cardHold as CardHoldStaffNotice_cardHold$key} />
  )
}

export default withComponentCompleteTestProviders(CardHoldStaffNoticeForTesting)
