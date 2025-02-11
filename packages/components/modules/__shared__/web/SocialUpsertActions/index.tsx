import React from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

const SocialUpsertActions = () => (
  <div className="grid grid-cols-[repeat(2,max-content)] gap-2">
    <IconButton disabled>
      <AttachmentIcon />
    </IconButton>
    <IconButton disabled>
      <MentionIcon />
    </IconButton>
  </div>
)

export default SocialUpsertActions
