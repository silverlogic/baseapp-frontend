import { FC } from 'react'

import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Button } from '@mui/material'

import { useFollowToggle } from '../../../common'
import { FollowToggleButtonProps } from './types'

const FollowToggleButton: FC<FollowToggleButtonProps> = ({ targetId, isFollowedByMe }) => {
  const { toggleFollow, isMutationInFlight } = useFollowToggle({ targetId })

  return (
    <Button
      onClick={toggleFollow}
      startIcon={
        isFollowedByMe ? <Iconify icon="ci:check-all" /> : <Iconify icon="mingcute:add-line" />
      }
      variant={isFollowedByMe ? 'soft' : 'contained'}
      color={isFollowedByMe ? 'inherit' : 'primary'}
      disabled={isMutationInFlight}
      size="medium"
    >
      {isFollowedByMe ? 'Following' : 'Follow'}
    </Button>
  )
}

export default FollowToggleButton
