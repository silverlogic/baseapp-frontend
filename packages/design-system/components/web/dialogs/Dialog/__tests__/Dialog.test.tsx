import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Dialog from '..'
import ThemeTestProvider from '../../../../../tests/web/utils/ThemeTestProvider'
import { DialogProps } from '../types'

const renderDialog = (props: Partial<DialogProps> = {}) =>
  render(
    <ThemeTestProvider>
      <Dialog open onClose={vi.fn()} {...props}>
        <p>Dialog body</p>
      </Dialog>
    </ThemeTestProvider>,
  )

const consoleErrors = () => vi.mocked(console.error).mock.calls.flat().map(String).join(' ')

describe('Dialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('gives the close button the default accessible name', () => {
    renderDialog()

    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })

  it('uses closeButtonLabel as the close button accessible name', () => {
    renderDialog({ closeButtonLabel: 'Fermer la fenêtre' })

    expect(screen.getByRole('button', { name: 'Fermer la fenêtre' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument()
  })

  it('renders no close button without onClose', () => {
    renderDialog({ onClose: undefined })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('forwards CloseButtonProps to the close button and still closes the dialog', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const onClick = vi.fn()
    renderDialog({ onClose, CloseButtonProps: { onClick, id: 'custom-close' } })

    const closeButton = screen.getByRole('button', { name: 'Close dialog' })
    expect(closeButton).toHaveAttribute('id', 'custom-close')

    await user.click(closeButton)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'backdropClick')
  })

  it.each(['{Enter}', ' '])('closes when the close button is activated with %s', async (key) => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderDialog({ onClose })

    screen.getByRole('button', { name: 'Close dialog' }).focus()
    await user.keyboard(key)

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'backdropClick')
  })

  it('keeps closeButtonLabel and CloseButtonProps off the DOM', () => {
    renderDialog({ closeButtonLabel: 'Dismiss', CloseButtonProps: { size: 'small' } })

    expect(document.querySelector('[closebuttonlabel]')).toBeNull()
    expect(document.querySelector('[closebuttonprops]')).toBeNull()
    expect(consoleErrors()).not.toMatch(/closeButtonLabel|CloseButtonProps/i)
  })
})
