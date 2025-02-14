import { ActionOverlayProps } from '../types'

export interface DefaultHoverOverlayProps
  extends Pick<
    ActionOverlayProps,
    | 'actions'
    | 'offsetRight'
    | 'offsetTop'
    | 'showDeleteButton'
    | 'isDeletingItem'
    | 'disableDeleteButton'
  > {
  handleDeleteDialogOpen: () => void
  handleLongPressItemOptionsClose: () => void
}
