import { useMemo } from 'react'

import { createTestEnvironment } from '@baseapp-frontend/graphql'

import type { CardHoldStatus, CardHoldStatusLabelView } from '../../../../common'
import CardHoldStatusLabelForTesting from './CardHoldStatusLabelForTesting'

/**
 * Stories for the Playwright component-testing gallery.
 *
 * The label reads `CardHold.status` and `kept` through its fragment, so the story seeds a
 * Relay environment with that hold. `status`, `kept` and `view` are plain JSON and come in
 * through `mount()` props; `AllStates` renders the whole matrix for a single screenshot.
 */
export interface CardHoldStatusLabelStoryProps {
  status: CardHoldStatus
  kept?: boolean
  view?: CardHoldStatusLabelView
}

const toResponse = ({ status, kept = false }: CardHoldStatusLabelStoryProps) => ({
  data: {
    cardHold: { __typename: 'CardHold', id: `test-card-hold-${status}-${kept}`, status, kept },
  },
})

const useSeededEnvironment = (hold: CardHoldStatusLabelStoryProps) =>
  useMemo(() => {
    const testEnvironment = createTestEnvironment()

    testEnvironment.queueOperationResolver({
      queryName: 'CardHoldStatusLabelForTestingQuery',
      data: toResponse(hold),
    })

    return testEnvironment.environment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

const Label = ({ view, ...hold }: CardHoldStatusLabelStoryProps) => {
  const environment = useSeededEnvironment(hold)

  return <CardHoldStatusLabelForTesting environment={environment} view={view} />
}

export const Default = (props: CardHoldStatusLabelStoryProps) => (
  <div style={{ padding: 16 }}>
    <Label {...props} />
  </div>
)

const MATRIX: Array<Omit<CardHoldStatusLabelStoryProps, 'view'>> = [
  { status: 'pending' },
  { status: 'authorized' },
  { status: 'released' },
  { status: 'captured' },
  { status: 'scheduled' },
  { status: 'saved' },
  { status: 'failed' },
  { status: 'failed', kept: true },
]

/** Every status in both views, side by side. */
export const AllStates = () => (
  <table style={{ padding: 16, borderSpacing: '16px 8px', fontFamily: 'sans-serif' }}>
    <thead>
      <tr>
        <th align="left">CardHold.status</th>
        <th align="left">customer</th>
        <th align="left">staff</th>
      </tr>
    </thead>
    <tbody>
      {MATRIX.map((hold) => (
        <tr key={`${hold.status}-${hold.kept}`} data-testid={`row-${hold.status}-${!!hold.kept}`}>
          <td>
            <code>
              {hold.status}
              {hold.kept ? ' (kept)' : ''}
            </code>
          </td>
          <td data-testid="customer">
            <Label {...hold} view="customer" />
          </td>
          <td data-testid="staff">
            <Label {...hold} view="staff" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
