import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { EmptyView } from '../../../../__shared__/native'

const EmptyChatRoomsState = () => (
  <EmptyView icon={<SocialMediaDiscussionImage />} title="No messages to be displayed." />
)

export default EmptyChatRoomsState
