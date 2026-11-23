import { SearchingImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { useIntl } from 'react-intl'

import { EmptyView } from '../../../__shared__/native'

const SearchNotFoundState = () => {
  const intl = useIntl()

  return (
    <EmptyView
      icon={<SearchingImage />}
      title={intl.formatMessage({
        id: 'shared.searchNotFound.title',
        defaultMessage: 'No results found',
      })}
      message={intl.formatMessage({
        id: 'shared.searchNotFound.message',
        defaultMessage: 'Check your spelling or try another search.',
      })}
    />
  )
}

export default SearchNotFoundState
