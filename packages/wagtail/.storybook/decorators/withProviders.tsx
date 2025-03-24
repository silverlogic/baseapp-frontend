import { FC } from 'react'

import { withDesignSystemTestProviders } from '@baseapp-frontend/design-system/tests/web/utils'
import { withGraphqlTestProviders } from '@baseapp-frontend/graphql'
import { compose } from '@baseapp-frontend/utils/dist/constants/compose'

export const withWagtailProviders = compose(withGraphqlTestProviders, withDesignSystemTestProviders)

export default withWagtailProviders
