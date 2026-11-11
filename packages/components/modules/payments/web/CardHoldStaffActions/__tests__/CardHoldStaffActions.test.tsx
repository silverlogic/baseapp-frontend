import type { PropsWithChildren, ReactElement } from 'react'

import { render as baseRender, screen, userEvent, waitFor, within } from '@baseapp-frontend/test'

import { ThemeProvider, createTheme } from '@mui/material'

import CardHoldStaffActions from '../index'

// The shared wrapper's empty theme lacks what MUI's Alert, Chip and Dialog read.
const theme = createTheme()
const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
const render = (ui: ReactElement) => baseRender(ui, { wrapper: Providers })

const { commitMock, toastMock } = vi.hoisted(() => ({
  commitMock: vi.fn(),
  toastMock: vi.fn(),
}))

vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: vi.fn((strings: TemplateStringsArray) => strings.join('')),
  useFragment: (_fragment: unknown, ref: unknown) => ref,
  useMutation: (document: string) => [
    (config: any) => commitMock(document.includes('cardHoldKeep') ? 'keep' : 'cancel', config),
    false,
  ],
}))

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual('@baseapp-frontend/utils')),
  useNotification: () => ({ sendToast: toastMock, sendMutationErrorToast: toastMock }),
}))

const failedHold = (overrides: Record<string, unknown> = {}) =>
  ({
    id: 'Q2FyZEhvbGQ6MQ==',
    status: 'failed',
    kept: false,
    failureReason: 'card_declined',
    ...overrides,
  }) as any

describe('CardHoldStaffActions', () => {
  beforeEach(() => {
    commitMock.mockReset()
    toastMock.mockReset()
  })

  it('renders nothing for a hold that did not fail', () => {
    render(<CardHoldStaffActions cardHold={failedHold({ status: 'scheduled' })} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument()
  })

  it('shows the failure reason and both actions', () => {
    render(<CardHoldStaffActions cardHold={failedHold()} />)
    expect(screen.getByText('card_declined')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('falls back when there is no failure reason', () => {
    render(<CardHoldStaffActions cardHold={failedHold({ failureReason: null })} />)
    expect(screen.getByText('No reason given')).toBeInTheDocument()
  })

  it('keeps the hold after confirming', async () => {
    const onDecided = vi.fn()
    commitMock.mockImplementation((_kind, config) =>
      config.onCompleted({ cardHoldKeep: { errors: null, cardHold: { id: 'x' } } }),
    )
    render(<CardHoldStaffActions cardHold={failedHold()} onDecided={onDecided} />)

    await userEvent.click(screen.getByRole('button', { name: 'Keep' }))
    expect(commitMock).not.toHaveBeenCalled()
    expect(screen.getByText('Keep despite the failed hold?')).toBeInTheDocument()

    const dialog = screen.getByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Keep' }))

    expect(commitMock).toHaveBeenCalledWith(
      'keep',
      expect.objectContaining({ variables: { input: { id: 'Q2FyZEhvbGQ6MQ==' } } }),
    )
    expect(onDecided).toHaveBeenCalledWith('keep')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('cancels the target after confirming', async () => {
    const onDecided = vi.fn()
    commitMock.mockImplementation((_kind, config) =>
      config.onCompleted({ cardHoldCancel: { errors: null, cardHold: { id: 'x' } } }),
    )
    render(<CardHoldStaffActions cardHold={failedHold()} onDecided={onDecided} />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancel it' }))

    expect(commitMock).toHaveBeenCalledWith('cancel', expect.anything())
    expect(onDecided).toHaveBeenCalledWith('cancel')
  })

  it('does not report a decision the backend rejected with a GraphQL error', async () => {
    const onDecided = vi.fn()
    // The backend raises GraphQLError for a forbidden id or an already-decided hold: Relay
    // completes with a null payload and the errors as the second argument.
    commitMock.mockImplementation((_kind, config) =>
      config.onCompleted({ cardHoldCancel: null }, [{ message: 'Hold already decided.' }]),
    )
    render(<CardHoldStaffActions cardHold={failedHold()} onDecided={onDecided} />)
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await userEvent.click(screen.getByRole('button', { name: 'Cancel it' }))

    expect(commitMock).toHaveBeenCalledWith('cancel', expect.anything())
    expect(onDecided).not.toHaveBeenCalled()
    expect(toastMock).toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('does not report a decision rejected in the payload errors', async () => {
    const onDecided = vi.fn()
    commitMock.mockImplementation((_kind, config) =>
      config.onCompleted({
        cardHoldKeep: { errors: [{ field: 'id', messages: ['No'] }], cardHold: null },
      }),
    )
    render(<CardHoldStaffActions cardHold={failedHold()} onDecided={onDecided} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep' }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Keep' }))

    expect(commitMock).toHaveBeenCalledWith('keep', expect.anything())
    expect(onDecided).not.toHaveBeenCalled()
    expect(toastMock).toHaveBeenCalled()
  })

  it('closes the dialog without deciding on Back', async () => {
    render(<CardHoldStaffActions cardHold={failedHold()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep' }))
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(commitMock).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('shows a kept hold without actions', () => {
    render(<CardHoldStaffActions cardHold={failedHold({ kept: true })} />)
    expect(screen.getByText(/kept: the card will be charged afresh/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Keep' })).not.toBeInTheDocument()
  })
})
