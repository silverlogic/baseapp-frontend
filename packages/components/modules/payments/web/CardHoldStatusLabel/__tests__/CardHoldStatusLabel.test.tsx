import type { PropsWithChildren, ReactElement } from 'react'

import { render as baseRender, screen } from '@baseapp-frontend/test'

import { ThemeProvider, createTheme } from '@mui/material'

import CardHoldStatusLabel from '../index'

// The shared wrapper's empty theme lacks what MUI's Alert, Chip and Dialog read.
const theme = createTheme()
const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
const render = (ui: ReactElement) => baseRender(ui, { wrapper: Providers })

// No Relay transform here: the fragment ref stands in for its own read result.
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: vi.fn(),
  useFragment: (_fragment: unknown, ref: unknown) => ref,
}))

const hold = (status: string, kept = false, paymentStatus = 'unpaid') =>
  ({ status, kept, paymentStatus }) as any

describe('CardHoldStatusLabel', () => {
  it('labels an authorized hold', () => {
    render(<CardHoldStatusLabel cardHold={hold('authorized')} />)
    expect(screen.getByText('Card held')).toBeInTheDocument()
  })

  it('never shows a failed hold as failed to a customer', () => {
    render(<CardHoldStatusLabel cardHold={hold('failed')} />)
    expect(screen.getByText('Hold scheduled')).toBeInTheDocument()
    expect(screen.queryByText(/fail/i)).not.toBeInTheDocument()
  })

  it('shows a failed hold to staff', () => {
    render(<CardHoldStatusLabel cardHold={hold('failed')} view="staff" />)
    expect(screen.getByText('Hold failed')).toBeInTheDocument()
  })

  it('shows a kept failed hold to staff', () => {
    render(<CardHoldStatusLabel cardHold={hold('failed', true)} view="staff" />)
    expect(screen.getByText('Hold failed · kept')).toBeInTheDocument()
  })

  it.each(['customer', 'staff'] as const)(
    'shows a partially paid hold as "Partially paid" in the warning color (%s)',
    (view) => {
      render(
        <CardHoldStatusLabel cardHold={hold('captured', false, 'partially_paid')} view={view} />,
      )
      expect(screen.getByText('Partially paid')).toBeInTheDocument()
      expect(screen.getByText('Partially paid').closest('.MuiChip-root')).toHaveClass(
        'MuiChip-colorWarning',
      )
      expect(screen.queryByText('Charged')).not.toBeInTheDocument()
    },
  )

  it.each(['released', 'captured'])(
    'shows a paid %s hold as "Paid" in the success color',
    (status) => {
      render(<CardHoldStatusLabel cardHold={hold(status, false, 'paid')} />)
      expect(screen.getByText('Paid').closest('.MuiChip-root')).toHaveClass('MuiChip-colorSuccess')
    },
  )

  it.each([
    ['failed', true, 'customer'],
    ['failed', true, 'staff'],
    ['scheduled', false, 'customer'],
    ['scheduled', false, 'staff'],
  ] as const)(
    'shows a paid %s hold (kept: %s) as "Paid" in the success color (%s)',
    (status, kept, view) => {
      render(<CardHoldStatusLabel cardHold={hold(status, kept, 'paid')} view={view} />)
      expect(screen.getByText('Paid').closest('.MuiChip-root')).toHaveClass('MuiChip-colorSuccess')
      expect(screen.queryByText(/fail|scheduled/i)).not.toBeInTheDocument()
    },
  )

  it.each([
    ['captured', 'unpaid', 'Charged'],
    ['released', 'unpaid', 'Released'],
    ['authorized', 'paid', 'Card held'],
  ])('keeps the status label for a %s hold whose payment is %s', (status, paymentStatus, label) => {
    render(<CardHoldStatusLabel cardHold={hold(status, false, paymentStatus)} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('passes paymentStatus to a custom label', () => {
    const getLabel = vi.fn(() => ({ label: 'custom', color: 'default' as const }))
    render(
      <CardHoldStatusLabel
        cardHold={hold('captured', false, 'partially_paid')}
        getLabel={getLabel}
      />,
    )
    expect(getLabel).toHaveBeenCalledWith('captured', {
      kept: false,
      view: 'customer',
      paymentStatus: 'partially_paid',
    })
  })

  it('takes a custom label', () => {
    render(
      <CardHoldStatusLabel
        cardHold={hold('captured')}
        getLabel={(status) => ({ label: `x-${status}`, color: 'success' })}
      />,
    )
    expect(screen.getByText('x-captured')).toBeInTheDocument()
  })
})
