import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { EmojiIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

const SocialUpsertActions: FC = () => {
  const theme = useTheme()

  return (
    <IconButton>
      <EmojiIcon color={theme.colors.object.low} />
    </IconButton>
  )
}

export default SocialUpsertActions
