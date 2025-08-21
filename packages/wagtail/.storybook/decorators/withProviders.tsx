import { FC } from 'react'

import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web'
import { withGraphqlTestProviders } from '@baseapp-frontend/graphql'
import { compose } from '@baseapp-frontend/utils/functions/compose'

export const withWagtailProviders = compose(withGraphqlTestProviders, withDesignSystemTestProviders)

export default withWagtailProviders
