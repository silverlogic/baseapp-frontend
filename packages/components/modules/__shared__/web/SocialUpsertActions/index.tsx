import React from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { AttachmentIcon, MentionIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { ActionsContainer } from './styled'

const SocialUpsertActions = () => (
  <ActionsContainer>
    <IconButton disabled>
      <AttachmentIcon />
    </IconButton>
    <IconButton disabled>
      <MentionIcon />
    </IconButton>
  </ActionsContainer>
)

export default SocialUpsertActions
