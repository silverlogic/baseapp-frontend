import { ActionOverlayProps } from '../types'

export interface DefaultHoverOverlayProps
  extends Pick<
    ActionOverlayProps,
    'actions' | 'offsetRight' | 'offsetTop' | 'enableDelete' | 'isDeletingItem'
  > {
  handleDeleteDialogOpen: () => void
  handleLongPressItemOptionsClose: () => void
}
