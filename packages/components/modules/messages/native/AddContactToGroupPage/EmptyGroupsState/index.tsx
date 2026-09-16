import { SocialMediaDiscussionImage } from '@baseapp-frontend/design-system/components/native/illustrations'

import { EmptyView } from '../../../../__shared__/native'

const EmptyGroupsState = () => (
  <EmptyView
    icon={<SocialMediaDiscussionImage />}
    title="No groups yet"
    message="You can only add contacts to groups you manage."
  />
)

export default EmptyGroupsState
