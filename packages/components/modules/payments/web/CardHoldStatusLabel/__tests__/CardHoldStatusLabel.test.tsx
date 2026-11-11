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

const hold = (status: string, kept = false) => ({ status, kept }) as any

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
