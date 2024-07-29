import React from 'react'

import { AttachementIcon, IconButton, MentionIcon } from '@baseapp-frontend/design-system'

const CommentUpsertActions = () => (
  <div className="grid grid-cols-[repeat(2,max-content)] gap-2">
    <IconButton disabled>
      <AttachementIcon />
    </IconButton>
    <IconButton disabled>
      <MentionIcon />
    </IconButton>
  </div>
)

export default CommentUpsertActions
