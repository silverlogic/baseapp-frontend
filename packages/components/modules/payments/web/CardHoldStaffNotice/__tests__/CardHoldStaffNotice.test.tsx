import { type PropsWithChildren, type ReactElement, useState } from 'react'

import { render as baseRender, screen, userEvent, waitFor, within } from '@baseapp-frontend/test'

import { ThemeProvider, createTheme } from '@mui/material'

import CardHoldStaffNotice from '../index'

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
    (config: any) =>
      commitMock(
        (['cardHoldKeep', 'cardHoldCancel', 'cardHoldRetry', 'cardHoldMarkPaid'] as const)
          .find((field) => document.includes(`${field}(`))!
          .replace('cardHold', '')
          .replace(/^./, (first) => first.toLowerCase()),
        config,
      ),
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
    retriesLeft: 3,
    paymentStatus: 'unpaid',
    canDecide: true,
    ...overrides,
  }) as any

describe('CardHoldStaffNotice', () => {
  beforeEach(() => {
    commitMock.mockReset()
    toastMock.mockReset()
  })

  it('renders nothing for a hold that did not fail', () => {
    render(<CardHoldStaffNotice cardHold={failedHold({ status: 'scheduled' })} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText(/failed/i)).not.toBeInTheDocument()
  })

  describe('canDecide', () => {
    it.each([
      ['failed', {}],
      ['kept failed', { kept: true }],
      ['partially paid', { status: 'captured', paymentStatus: 'partially_paid' }],
    ])('renders nothing for a %s hold when the viewer cannot decide', (_name, overrides) => {
      render(<CardHoldStaffNotice cardHold={failedHold({ ...overrides, canDecide: false })} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.queryByText(/failed|partially paid|kept/i)).not.toBeInTheDocument()
      expect(screen.queryByText('card_declined')).not.toBeInTheDocument()
    })

    it('shows the failed panel when the viewer can decide', () => {
      render(<CardHoldStaffNotice cardHold={failedHold({ canDecide: true })} />)
      expect(screen.getByText('The card hold failed')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(3)
    })

    it('shows the partially paid panel when the viewer can decide', () => {
      render(
        <CardHoldStaffNotice
          cardHold={failedHold({
            status: 'captured',
            paymentStatus: 'partially_paid',
            canDecide: true,
          })}
        />,
      )
      expect(screen.getByRole('button', { name: 'Mark paid' })).toBeInTheDocument()
    })
  })

  it('shows the failure reason and both actions', () => {
    render(<CardHoldStaffNotice cardHold={failedHold()} />)
    expect(screen.getByText('card_declined')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('falls back when there is no failure reason', () => {
    render(<CardHoldStaffNotice cardHold={failedHold({ failureReason: null })} />)
    expect(screen.getByText('No reason given')).toBeInTheDocument()
  })

  it('keeps the hold after confirming', async () => {
    const onDecided = vi.fn()
    commitMock.mockImplementation((_kind, config) =>
      config.onCompleted({ cardHoldKeep: { errors: null, cardHold: { id: 'x' } } }),
    )
    render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)

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
    render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)

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
    render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)
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
    render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep' }))
    await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Keep' }))

    expect(commitMock).toHaveBeenCalledWith('keep', expect.anything())
    expect(onDecided).not.toHaveBeenCalled()
    expect(toastMock).toHaveBeenCalled()
  })

  it('closes the dialog without deciding on Back', async () => {
    render(<CardHoldStaffNotice cardHold={failedHold()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep' }))
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(commitMock).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('renders nothing for a kept failed hold that was then charged', () => {
    render(
      <CardHoldStaffNotice
        cardHold={failedHold({ kept: true, paymentStatus: 'paid', canDecide: true })}
      />,
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText(/failed|kept/i)).not.toBeInTheDocument()
    expect(screen.queryByText('card_declined')).not.toBeInTheDocument()
  })

  it('shows a kept hold without actions', () => {
    render(<CardHoldStaffNotice cardHold={failedHold({ kept: true })} />)
    expect(screen.getByText(/kept: the card will be charged afresh/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Keep' })).not.toBeInTheDocument()
  })

  it.each([
    ['a failed hold', failedHold(), 'error', 'The card hold failed'],
    ['a kept failed hold', failedHold({ kept: true }), 'info', 'The card hold failed'],
    [
      'a partially paid hold',
      failedHold({ status: 'captured', paymentStatus: 'partially_paid' }),
      'warning',
      'Partially paid',
    ],
  ])('shows %s as a %s notice with its actions inside', (_, hold, severity, title) => {
    render(<CardHoldStaffNotice cardHold={hold} />)
    const notice = screen.getByRole('alert')
    expect(notice).toHaveClass(`MuiAlert-standard${severity[0]!.toUpperCase()}${severity.slice(1)}`)
    expect(within(notice).getByText(title)).toBeInTheDocument()
    if (!hold.kept) expect(within(notice).getAllByRole('button').length).toBeGreaterThan(0)
  })

  describe('retry', () => {
    /** Holds the hold in state, as the Relay store would after the mutation's payload lands. */
    const Harness = ({
      initial,
      onDecided,
      setHoldRef,
    }: {
      initial: Record<string, unknown>
      onDecided?: (decision: string) => void
      setHoldRef: { current?: (hold: any) => void }
    }) => {
      const [hold, setHold] = useState(failedHold(initial))
      // eslint-disable-next-line no-param-reassign
      setHoldRef.current = setHold
      return <CardHoldStaffNotice cardHold={hold} onDecided={onDecided} />
    }

    /** Resolves the retry the way the backend would: the store updates, then onCompleted. */
    const answerRetryWith = (
      setHoldRef: { current?: (hold: any) => void },
      next: Record<string, unknown>,
    ) =>
      commitMock.mockImplementation((_kind, config) => {
        setHoldRef.current?.(failedHold(next))
        config.onCompleted({ cardHoldRetry: { errors: null, cardHold: { id: 'x' } } })
      })

    it('offers a retry on a failed hold with retries left, and says how many', () => {
      render(<CardHoldStaffNotice cardHold={failedHold({ retriesLeft: 2 })} />)
      expect(screen.getByRole('button', { name: 'Retry hold' })).toBeInTheDocument()
      expect(screen.getByText('2 retries left')).toBeInTheDocument()
    })

    it('says "1 retry left" in the singular', () => {
      render(<CardHoldStaffNotice cardHold={failedHold({ retriesLeft: 1 })} />)
      expect(screen.getByText('1 retry left')).toBeInTheDocument()
    })

    it('hides the retry and explains what remains when no retries are left', () => {
      render(<CardHoldStaffNotice cardHold={failedHold({ retriesLeft: 0 })} />)
      expect(screen.queryByRole('button', { name: 'Retry hold' })).not.toBeInTheDocument()
      expect(screen.getByText('No retries left: only Keep or Cancel remain.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })

    it('hides the retry on a kept hold', () => {
      render(<CardHoldStaffNotice cardHold={failedHold({ kept: true, retriesLeft: 2 })} />)
      expect(screen.queryByRole('button', { name: 'Retry hold' })).not.toBeInTheDocument()
      expect(screen.queryByText(/retr(y|ies) left/)).not.toBeInTheDocument()
    })

    it.each(['authorized', 'pending', 'scheduled', 'captured'])(
      'renders nothing for a %s hold, whatever retriesLeft says',
      (status) => {
        render(<CardHoldStaffNotice cardHold={failedHold({ status, retriesLeft: 2 })} />)
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
      },
    )

    it('asks before retrying, saying the same card is tried again now, off-session', async () => {
      render(<CardHoldStaffNotice cardHold={failedHold()} />)
      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))

      expect(commitMock).not.toHaveBeenCalled()
      const dialog = screen.getByRole('dialog')
      expect(within(dialog).getByText('Retry the hold now?')).toBeInTheDocument()
      expect(
        within(dialog).getByText(/same saved card will be tried again now, off-session/),
      ).toBeInTheDocument()

      await userEvent.click(within(dialog).getByRole('button', { name: 'Back' }))
      expect(commitMock).not.toHaveBeenCalled()
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('reports the retry and drops the actions once the hold is authorized', async () => {
      const onDecided = vi.fn()
      const setHoldRef: { current?: (hold: any) => void } = {}
      answerRetryWith(setHoldRef, { status: 'authorized', retriesLeft: null })
      render(<Harness initial={{ retriesLeft: 3 }} onDecided={onDecided} setHoldRef={setHoldRef} />)

      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))
      await userEvent.click(screen.getByRole('button', { name: 'Retry now' }))

      expect(commitMock).toHaveBeenCalledWith(
        'retry',
        expect.objectContaining({ variables: { input: { id: 'Q2FyZEhvbGQ6MQ==' } } }),
      )
      expect(onDecided).toHaveBeenCalledWith('retry')
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.queryByText('The card hold failed')).not.toBeInTheDocument()
    })

    it('reports the retry and drops the actions once the hold is scheduled for later', async () => {
      const onDecided = vi.fn()
      const setHoldRef: { current?: (hold: any) => void } = {}
      answerRetryWith(setHoldRef, {
        status: 'scheduled',
        failureReason: null,
        retriesLeft: null,
      })
      render(<Harness initial={{ retriesLeft: 3 }} onDecided={onDecided} setHoldRef={setHoldRef} />)

      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))
      await userEvent.click(screen.getByRole('button', { name: 'Retry now' }))

      expect(commitMock).toHaveBeenCalledWith('retry', expect.anything())
      expect(onDecided).toHaveBeenCalledTimes(1)
      expect(onDecided).toHaveBeenCalledWith('retry')
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.queryByText('The card hold failed')).not.toBeInTheDocument()
    })

    it('shows the failed state with one retry fewer when the retry fails again', async () => {
      const onDecided = vi.fn()
      const setHoldRef: { current?: (hold: any) => void } = {}
      answerRetryWith(setHoldRef, { retriesLeft: 1, failureReason: 'insufficient_funds' })
      render(<Harness initial={{ retriesLeft: 2 }} onDecided={onDecided} setHoldRef={setHoldRef} />)
      expect(screen.getByText('2 retries left')).toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))
      await userEvent.click(screen.getByRole('button', { name: 'Retry now' }))

      expect(onDecided).toHaveBeenCalledWith('retry')
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(screen.getByText('The card hold failed')).toBeInTheDocument()
      expect(screen.getByText('insufficient_funds')).toBeInTheDocument()
      expect(screen.getByText('1 retry left')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Retry hold' })).toBeEnabled()
    })

    it('does not report a retry the backend rejected with a GraphQL error, and toasts', async () => {
      const onDecided = vi.fn()
      commitMock.mockImplementation((_kind, config) =>
        config.onCompleted({ cardHoldRetry: null }, [{ message: 'No retries left.' }]),
      )
      render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)
      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))
      await userEvent.click(screen.getByRole('button', { name: 'Retry now' }))

      expect(commitMock).toHaveBeenCalledWith('retry', expect.anything())
      expect(onDecided).not.toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalled()
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('does not report a retry rejected in the payload errors', async () => {
      const onDecided = vi.fn()
      commitMock.mockImplementation((_kind, config) =>
        config.onCompleted({
          cardHoldRetry: { errors: [{ field: 'id', messages: ['No'] }], cardHold: null },
        }),
      )
      render(<CardHoldStaffNotice cardHold={failedHold()} onDecided={onDecided} />)
      await userEvent.click(screen.getByRole('button', { name: 'Retry hold' }))
      await userEvent.click(screen.getByRole('button', { name: 'Retry now' }))

      expect(onDecided).not.toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalled()
    })

    it('takes custom copy', () => {
      render(
        <CardHoldStaffNotice
          cardHold={failedHold({ retriesLeft: 2 })}
          messages={{ retryButton: 'Réessayer', retriesLeft: (n) => `${n} essais restants` }}
        />,
      )
      expect(screen.getByRole('button', { name: 'Réessayer' })).toBeInTheDocument()
      expect(screen.getByText('2 essais restants')).toBeInTheDocument()
    })
  })

  describe('mark paid', () => {
    const partiallyPaidHold = (overrides: Record<string, unknown> = {}) =>
      failedHold({
        status: 'captured',
        failureReason: null,
        retriesLeft: null,
        paymentStatus: 'partially_paid',
        ...overrides,
      })

    it('offers Mark paid on a partially paid hold, and nothing else', () => {
      render(<CardHoldStaffNotice cardHold={partiallyPaidHold()} />)
      expect(screen.getByText('Partially paid')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(1)
      expect(screen.getByRole('button', { name: 'Mark paid' })).toBeInTheDocument()
    })

    it('renders nothing once the hold is paid', () => {
      render(<CardHoldStaffNotice cardHold={partiallyPaidHold({ paymentStatus: 'paid' })} />)
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('marks it paid after confirming', async () => {
      const onDecided = vi.fn()
      commitMock.mockImplementation((_kind, config) =>
        config.onCompleted({ cardHoldMarkPaid: { errors: null, cardHold: { id: 'x' } } }),
      )
      render(<CardHoldStaffNotice cardHold={partiallyPaidHold()} onDecided={onDecided} />)

      await userEvent.click(screen.getByRole('button', { name: 'Mark paid' }))
      expect(commitMock).not.toHaveBeenCalled()
      const dialog = screen.getByRole('dialog')
      expect(within(dialog).getByText('Mark it paid?')).toBeInTheDocument()
      await userEvent.click(within(dialog).getByRole('button', { name: 'Mark paid' }))

      expect(commitMock).toHaveBeenCalledWith(
        'markPaid',
        expect.objectContaining({ variables: { input: { id: 'Q2FyZEhvbGQ6MQ==' } } }),
      )
      expect(onDecided).toHaveBeenCalledWith('markPaid')
    })

    it('does not report a mark paid the backend rejected', async () => {
      const onDecided = vi.fn()
      commitMock.mockImplementation((_kind, config) =>
        config.onCompleted({ cardHoldMarkPaid: null }, [{ message: 'Not partially paid.' }]),
      )
      render(<CardHoldStaffNotice cardHold={partiallyPaidHold()} onDecided={onDecided} />)
      await userEvent.click(screen.getByRole('button', { name: 'Mark paid' }))
      await userEvent.click(
        within(screen.getByRole('dialog')).getByRole('button', { name: 'Mark paid' }),
      )

      expect(onDecided).not.toHaveBeenCalled()
      expect(toastMock).toHaveBeenCalled()
    })
  })
})
