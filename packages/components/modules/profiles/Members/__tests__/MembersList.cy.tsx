import { graphql, useLazyLoadQuery } from 'react-relay'

import MembersList from '../MembersList'
import { mockResolvers } from './__mocks__/membersListResolvers'
import { RelayTestProvider } from './__utils__/RelayTestProvider'

const TestMembersList = () => {
  const data = useLazyLoadQuery(
    graphql`
      query UserMembersListPaginationQuery {
        user {
          ...UserMembersListFragment
        }
      }
    `,
    {},
  )

  return <MembersList userRef={data.user} />
}

describe('MembersList Component', () => {
  beforeEach(() => {
    cy.viewport(800, 600)
  })

  it('renders members list with search and count', () => {
    cy.mount(
      <RelayTestProvider mockResolvers={mockResolvers}>
        <TestMembersList />
      </RelayTestProvider>,
    )

    cy.findByRole('searchbox').should('exist')
    cy.findByText(/3 members/i).should('exist')
  })
})
