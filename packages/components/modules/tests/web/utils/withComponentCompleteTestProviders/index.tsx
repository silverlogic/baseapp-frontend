import { withAuthenticationTestProviders } from '@baseapp-frontend/authentication/dist/modules/tests/utils'
import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web/utils'
import { withGraphqlTestProviders } from '@baseapp-frontend/graphql/dist/tests/utils'
import { compose } from '@baseapp-frontend/utils'

import withComponentTestProviders from '../withComponentTestProviders'

const withComponentCompleteTestProviders = compose(
  withComponentTestProviders,
  withAuthenticationTestProviders,
  withGraphqlTestProviders,
  withDesignSystemTestProviders,
)

export default withComponentCompleteTestProviders
