import { Dispatch, MouseEvent, SetStateAction } from 'react'

import { ActionOverlayProps } from '../types'

export interface ThreeDotsMenuHoverOverlayProps
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
  handleClosePopover: () => void
  popover: {
    open: HTMLElement | null
    onOpen: (event: MouseEvent<HTMLElement>) => void
    onClose: () => void
    setOpen: Dispatch<SetStateAction<HTMLElement | null>>
  }
}
