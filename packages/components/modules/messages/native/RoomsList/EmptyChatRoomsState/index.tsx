import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { useIntl } from 'react-intl'

import { EmptyView } from '../../../../__shared__/native'

const EmptyChatRoomsState = () => {
  const intl = useIntl()

  return (
    <EmptyView
      icon={<SocialMediaDiscussionImage />}
      title={intl.formatMessage({
        id: 'messages.chatRoomsList.empty',
        defaultMessage: 'No messages to be displayed.',
      })}
    />
  )
}

export default EmptyChatRoomsState
