/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import {
  isRole,
  isAdmin,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  DEFAULT_ROLES,
  withPermissions,
} from '../src/permissions'

describe('permission utils', () => {
  test('should check the user role', () => {
    const user = { role: 'customer' }
    expect(isRole(user, 'manager')).toBeFalsy()
    expect(isRole(user, 'customer')).toBeTruthy()
  })

  test('should check if admin', () => {
    let user = { role: 'customer' }
    expect(isAdmin(user)).toBeFalsy()
    user = { role: DEFAULT_ROLES.admin }
    expect(isAdmin(user)).toBeTruthy()
  })

  test('should check if user has specific permission', () => {
    const user = { permissions: ['access_page_permission'] }
    expect(hasPermission(user, 'other_permission')).toBeFalsy()
    expect(hasPermission(user, 'access_page_permission')).toBeTruthy()
  })

  test('should check if user has any permission', () => {
    const user = { permissions: ['access_page_permission'] }
    expect(hasAnyPermission(user, ['other_permission', 'other_permission_1'])).toBeFalsy()
    expect(
      hasAnyPermission(user, ['other_permission', 'other_permission_1', 'access_page_permission']),
    ).toBeTruthy()
  })
  test('should check if user has all permission', () => {
    const user = { permissions: ['access_page_permission', 'retrieve_data_permission'] }
    expect(
      hasAllPermissions(user, [
        'access_page_permission',
        'retrieve_data_permission',
        'special_action_permission',
      ]),
    ).toBeFalsy()
    expect(
      hasAllPermissions(user, ['access_page_permission', 'retrieve_data_permission']),
    ).toBeTruthy()
  })
})

describe('withPermissions', () => {
  test('should return denied component if permissions were not met', () => {
    const user = { permissions: [] }
    const TestComponent = () => <p>This is a test!</p>
    const NoAccessGranted = () => <p>No Access!</p>

    const TestComponentWithPermissions = withPermissions(TestComponent, {
      any: ['access_restricted_permission'],
      PermissionDeniedComponent: NoAccessGranted,
    })

    const { getByText } = render(<TestComponentWithPermissions user={user} />)

    expect(getByText('No Access!')).toBeTruthy()
  })

  test('should return null if permissions were not met and setting to hide is passed', () => {
    const user = { permissions: [] }
    const TestComponent = () => <p>This is a test!</p>
    const NoAccessGranted = () => <p>No Access!</p>

    const TestComponentWithPermissions = withPermissions(TestComponent, {
      any: ['access_restricted_permission'],
      PermissionDeniedComponent: NoAccessGranted,
      hide: true,
    })

    const { container } = render(<TestComponentWithPermissions user={user} />)

    expect(container.children.length).toBeFalsy()
  })

  test('should return wrapped component if permissions were met', () => {
    const user = { permissions: ['access_restricted_permission', 'admin_permission'] }
    const TestComponent = () => <p>This is a test!</p>
    const NoAccessGranted = () => <p>No Access!</p>

    const TestComponentWithPermissions = withPermissions(TestComponent, {
      all: ['access_restricted_permission', 'admin_permission'],
      PermissionDeniedComponent: NoAccessGranted,
    })

    const { getByText } = render(<TestComponentWithPermissions user={user} />)

    expect(getByText('This is a test!')).toBeTruthy()
  })
})
