import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { EmojiIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { SocialUpsertActionsProps } from './types'

// The placeholder emoji button ignores shouldUseBottomSheetSafeComponents; it has no action yet.
const SocialUpsertActions: FC<SocialUpsertActionsProps> = () => {
  const theme = useTheme()

  return (
    <IconButton>
      <EmojiIcon color={theme.colors.object.low} />
    </IconButton>
  )
}

export default SocialUpsertActions
