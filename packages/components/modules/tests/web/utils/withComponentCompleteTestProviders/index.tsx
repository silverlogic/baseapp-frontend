import { withAuthenticationTestProviders } from '@baseapp-frontend/authentication'
import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web/utils'
import { withGraphqlTestProviders } from '@baseapp-frontend/graphql'
import { compose } from '@baseapp-frontend/utils/functions/compose'

import withComponentTestProviders from '../withComponentTestProviders'

const withComponentCompleteTestProviders = compose(
  withAuthenticationTestProviders,
  withComponentTestProviders,
  withGraphqlTestProviders,
  withDesignSystemTestProviders,
)

export default withComponentCompleteTestProviders
