import { FC } from 'react'

import { render } from '@baseapp-frontend/test'
import { JWTContent } from '@baseapp-frontend/utils'

import withUser from '..'
import { User } from '../../../../types/user'
import getUser from '../../getUser'
import { ComponentWithUser } from '../types'

jest.mock('../../getUser', () => jest.fn())

type JWTUser = User & JWTContent

const MockComponent: FC<ComponentWithUser<JWTUser>> = ({ user }) => (
  <div>{user ? `Hello, ${user.firstName}` : 'No user'}</div>
)

describe('withUser HOC', () => {
  const getUserMock = getUser as jest.Mock

  it('passes the user object to the wrapped component', async () => {
    const userMock = { firstName: 'John', lastName: 'Doe' }
    getUserMock.mockReturnValue(userMock)

    const WithUserComponent = withUser<JWTUser>(MockComponent)
    const { findByText } = render(WithUserComponent({}))

    const userElement = await findByText(`Hello, ${userMock.firstName}`)
    expect(userElement).toBeInTheDocument()
  })

  it('handles the case when there is no user', async () => {
    getUserMock.mockReturnValue(null)

    const WithUserComponent = withUser<JWTUser>(MockComponent)
    const { findByText } = render(WithUserComponent({}))

    const userElement = await findByText('No user')
    expect(userElement).toBeInTheDocument()
  })
})
