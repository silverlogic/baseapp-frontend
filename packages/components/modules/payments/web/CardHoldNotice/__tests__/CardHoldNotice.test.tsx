import type { PropsWithChildren, ReactElement } from 'react'

import { render as baseRender, screen } from '@baseapp-frontend/test'

import { ThemeProvider, createTheme } from '@mui/material'

import CardHoldNotice from '../index'

// The shared wrapper's empty theme lacks what MUI's Alert, Chip and Dialog read.
const theme = createTheme()
const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
const render = (ui: ReactElement) => baseRender(ui, { wrapper: Providers })

// the common barrel carries graphql documents, which need the Relay transform
vi.mock('react-relay', async () => ({
  ...(await vi.importActual('react-relay')),
  graphql: vi.fn(),
}))

describe('CardHoldNotice', () => {
  it('says the card is held now', () => {
    render(<CardHoldNotice status="placed" />)
    expect(screen.getByRole('status')).toHaveTextContent(/hold has been placed on your card/i)
  })

  it('says when a scheduled hold is placed', () => {
    render(<CardHoldNotice status="scheduled" holdOn="2026-11-14" />)
    expect(screen.getByRole('status')).toHaveTextContent('Your card will be held on Nov 14, 2026.')
  })

  it('says a saved card is charged on the date', () => {
    render(<CardHoldNotice status="card_saved" chargeOn="2026-12-01" />)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Your card has been saved and will be charged on Dec 1, 2026.',
    )
  })

  it('says the card is charged now', () => {
    render(<CardHoldNotice status="charge_now" />)
    expect(screen.getByRole('status')).toHaveTextContent('Your card will be charged now.')
  })

  it('renders custom copy', () => {
    render(
      <CardHoldNotice
        status="scheduled"
        holdOn="2026-11-14"
        messages={{ scheduled: ({ holdOn }) => `Retendremos tu tarjeta el ${holdOn}.` }}
      />,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Retendremos tu tarjeta el Nov 14, 2026.')
  })
})
