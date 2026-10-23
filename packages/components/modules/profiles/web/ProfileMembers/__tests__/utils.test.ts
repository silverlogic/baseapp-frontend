import { DEACTIVATE_MEMBER_OPTION, MEMBER_STATUSES, roleOptions } from '../constants'
import { getMemberLabel } from '../utils'

describe('getMemberLabel', () => {
  it('capitalizes the value when nothing else names it', () => {
    expect(getMemberLabel('MANAGER')).toBe('Manager')
    expect(getMemberLabel(MEMBER_STATUSES.cancelled)).toBe('Cancelled')
  })

  it('prefers the label of the matching menu option', () => {
    expect(getMemberLabel('MEMBER', undefined, [{ value: 'MEMBER', label: 'Team member' }])).toBe(
      'Team member',
    )
  })

  it('prefers the project label over the menu option', () => {
    expect(getMemberLabel('MANAGER', { MANAGER: 'Member' }, roleOptions)).toBe('Member')
  })

  it('returns an empty label for a missing value', () => {
    expect(getMemberLabel(undefined)).toBe('')
    expect(getMemberLabel(null, { OWNER: 'Owner' })).toBe('')
  })
})

describe('member menu defaults', () => {
  it('keeps Deactivate out of the default menu', () => {
    expect(roleOptions.map(({ value }) => value)).toEqual(['ADMIN', 'MANAGER', 'REMOVE'])
    expect(DEACTIVATE_MEMBER_OPTION).toEqual({ value: 'DEACTIVATE', label: 'Deactivate' })
  })
})
