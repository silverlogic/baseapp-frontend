import { PreloadedQuery } from 'react-relay'

import { GroupDetailsQuery } from '../../../../__generated__/GroupDetailsQuery.graphql'

export type ProfileSummaryProps = {
  queryRef: PreloadedQuery<GroupDetailsQuery>
  onBackButtonClicked: () => void
}
