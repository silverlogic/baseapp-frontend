import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ConfirmDialog from '..'
import ThemeTestProvider from '../../../../../tests/web/utils/ThemeTestProvider'
import { ConfirmDialogProps } from '../types'

const renderConfirmDialog = (props: Partial<ConfirmDialogProps> = {}) =>
  render(
    <ThemeTestProvider>
      <ConfirmDialog
        open
        title="Delete item?"
        content="This cannot be undone."
        action={<button type="button">Delete</button>}
        onClose={vi.fn()}
        {...props}
      />
    </ThemeTestProvider>,
  )

describe('ConfirmDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('passes closeButtonLabel and CloseButtonProps through to the close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderConfirmDialog({
      onClose,
      closeButtonLabel: 'Cerrar',
      CloseButtonProps: { id: 'confirm-close' },
    })

    const closeButton = screen.getByRole('button', { name: 'Cerrar' })
    expect(closeButton).toHaveAttribute('id', 'confirm-close')

    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps the default close label and the cancel button', () => {
    renderConfirmDialog()

    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('hides only the cancel button with hideCancelButton', () => {
    renderConfirmDialog({ hideCancelButton: true })

    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
})
