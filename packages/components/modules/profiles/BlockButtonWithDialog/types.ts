import { ButtonProps } from '@mui/material'

import { BlockToggleFragment$key } from '../../../__generated__/BlockToggleFragment.graphql'

export interface ActionButtonProps extends ButtonProps {
  isBlocked?: boolean | null
}

export interface BlockButtonWithDialogProps {
  target: BlockToggleFragment$key
  currentProfileId?: string
  isMenu?: boolean
  handleError?: () => void
  handleCloseMenu?: () => void
}
