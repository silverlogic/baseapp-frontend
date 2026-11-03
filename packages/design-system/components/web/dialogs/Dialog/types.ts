import { DialogProps as MUIDialogProps } from '@mui/material'

import { IconButtonProps } from '../../buttons/IconButton/types'

export interface DialogProps extends MUIDialogProps {
  customMaxWidth?: string | number
  /**
   * Accessible name of the icon-only close button, rendered as its `aria-label`.
   * Pass a translated string in localized apps. Defaults to `'Close dialog'`.
   */
  closeButtonLabel?: string
  /**
   * Extra props for the close button (e.g. `data-testid`, `sx`, `size`). Its `onClick`, if
   * any, runs before the dialog's `onClose`. An `aria-label` here overrides `closeButtonLabel`.
   */
  CloseButtonProps?: Partial<IconButtonProps>
}
