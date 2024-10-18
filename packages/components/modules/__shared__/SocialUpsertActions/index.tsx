import React from 'react'

import { AttachmentIcon, IconButton, MentionIcon } from '@baseapp-frontend/design-system'

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
