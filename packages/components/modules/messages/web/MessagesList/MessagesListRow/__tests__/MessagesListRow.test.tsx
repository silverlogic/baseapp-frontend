import { memo } from 'react'

import { render, screen } from '@baseapp-frontend/test'

import MessagesListRow from '..'
import { MessagesListRowContext } from '../context'

// Stands in for Virtuoso's item list, which keeps rendering the rows it already has until a
// layout effect hands it new props.
const StaleList = memo(() => <MessagesListRow index={1} />)

const renderWithMessages = (messages: string[]) => (
  <MessagesListRowContext.Provider
    value={{ renderMessagesGroup: (index) => <p>{messages[index]}</p> }}
  >
    <StaleList />
  </MessagesListRowContext.Provider>
)

describe('MessagesListRow', () => {
  it('renders the message group at its index', () => {
    render(renderWithMessages(['first', 'second']))

    expect(screen.getByText('second')).toBeInTheDocument()
  })

  it('renders the latest messages even when its parent does not re-render', () => {
    const { rerender } = render(renderWithMessages(['first', 'optimistic']))

    rerender(renderWithMessages(['first', 'from the server']))

    expect(screen.getByText('from the server')).toBeInTheDocument()
    expect(screen.queryByText('optimistic')).not.toBeInTheDocument()
  })
})
