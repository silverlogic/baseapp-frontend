import { type PropsWithChildren, type ReactElement } from 'react'

import { render as baseRender, screen } from '@baseapp-frontend/test'

import { ThemeProvider, createTheme } from '@mui/material'

import NotificationItemRenderer from '../../NotificationItemRenderer'

// The payments barrel reaches a design-system hook that reads localStorage when imported.
vi.hoisted(() => {
  if (!globalThis.localStorage?.getItem) {
    const store = new Map<string, string>()
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        removeItem: (key: string) => store.delete(key),
        clear: () => store.clear(),
      },
    })
  }
})

// The shared wrapper's empty theme lacks what MUI's Alert reads.
const theme = createTheme()
const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
const render = (ui: ReactElement) => baseRender(ui, { wrapper: Providers })

vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: vi.fn((strings: TemplateStringsArray) => strings.join('')),
  useFragment: (_fragment: unknown, ref: unknown) => ref,
  useMutation: () => [vi.fn(), false],
}))

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual('@baseapp-frontend/utils')),
  useNotification: () => ({ sendToast: vi.fn(), sendMutationErrorToast: vi.fn() }),
}))

const cardHold = (overrides: Record<string, unknown> = {}) => ({
  __typename: 'CardHold',
  id: 'Q2FyZEhvbGQ6MQ==',
  status: 'failed',
  kept: false,
  failureReason: 'card_declined',
  retriesLeft: 2,
  paymentStatus: 'unpaid',
  canDecide: true,
  ...overrides,
})

const notification = (verb: string, target: unknown, description: string) =>
  ({
    id: 'Tm90aWZpY2F0aW9uOjE=',
    unread: true,
    timestamp: new Date().toISOString(),
    level: 'warning',
    verb,
    description,
    data: null,
    actor: { __typename: 'Profile', id: 'UHJvZmlsZTox', name: 'Ada Customer', image: null },
    target,
    actionObject: null,
  }) as any

describe('CardHoldNotification', () => {
  it('shows a failed hold with its staff notice and actions', () => {
    render(
      <NotificationItemRenderer
        notification={notification(
          'PAYMENTS.CARD_HOLD_FAILED',
          cardHold(),
          'The card hold for Order 7 failed.',
        )}
      />,
    )

    expect(screen.getByText('The card hold for Order 7 failed.')).toBeInTheDocument()
    const notice = screen.getByRole('alert')
    expect(notice).toHaveTextContent('The card hold failed')
    expect(notice).toHaveTextContent('card_declined')
    expect(screen.getByRole('button', { name: 'Keep' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry hold' })).toBeInTheDocument()
  })

  it('shows a partially paid hold with Mark paid', () => {
    render(
      <NotificationItemRenderer
        notification={notification(
          'PAYMENTS.CARD_HOLD_PARTIALLY_PAID',
          cardHold({ status: 'captured', paymentStatus: 'partially_paid' }),
          'Order 7 was only partly paid: the charge above the hold was declined.',
        )}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Partially paid')
    expect(screen.getByRole('button', { name: 'Mark paid' })).toBeInTheDocument()
  })

  it('keeps the sentence but drops the notice once the hold is settled', () => {
    render(
      <NotificationItemRenderer
        notification={notification(
          'PAYMENTS.CARD_HOLD_FAILED',
          cardHold({ paymentStatus: 'paid', kept: true }),
          'The card hold for Order 7 failed.',
        )}
      />,
    )

    expect(screen.getByText('The card hold for Order 7 failed.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows only the sentence when the hold is gone', () => {
    render(
      <NotificationItemRenderer
        notification={notification('PAYMENTS.CARD_HOLD_FAILED', null, 'The card hold failed.')}
      />,
    )

    expect(screen.getByText('The card hold failed.')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('takes a replacement notice', () => {
    render(
      <NotificationItemRenderer
        notification={notification('PAYMENTS.CARD_HOLD_FAILED', cardHold(), 'Failed.')}
        CardHoldNotificationProps={{
          CardHoldStaffNotice: () => <p>custom notice</p>,
        }}
      />,
    )

    expect(screen.getByText('custom notice')).toBeInTheDocument()
  })
})
