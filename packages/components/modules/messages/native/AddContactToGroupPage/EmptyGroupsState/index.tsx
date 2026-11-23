import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { useIntl } from 'react-intl'

import { EmptyView } from '../../../../__shared__/native'

const EmptyGroupsState = () => {
  const intl = useIntl()

  return (
    <EmptyView
      icon={<SocialMediaDiscussionImage />}
      title={intl.formatMessage({
        id: 'messages.addContactToGroup.groupsList.empty.title',
        defaultMessage: 'No groups yet',
      })}
      message={intl.formatMessage({
        id: 'messages.addContactToGroup.groupsList.empty.description',
        defaultMessage: 'You can only add contacts to groups you manage.',
      })}
    />
  )
}

export default EmptyGroupsState
