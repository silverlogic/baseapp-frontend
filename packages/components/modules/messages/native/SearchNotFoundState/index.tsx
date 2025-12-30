import { SearchingImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { EmptyView } from '../../../__shared__/native'

const SearchNotFoundState = () => (
  <EmptyView
    icon={<SearchingImage />}
    title="No results found"
    message="Check your spelling or try another search."
  />
)

export default SearchNotFoundState
