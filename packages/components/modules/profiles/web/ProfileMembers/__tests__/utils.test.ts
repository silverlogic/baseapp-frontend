import { DEACTIVATE_MEMBER_OPTION, MEMBER_STATUSES, roleOptions } from '../constants'
import { formatMemberOptionLabel, getMemberLabel } from '../utils'

describe('getMemberLabel', () => {
  it("uses BaseApp's label for a known role or status", () => {
    expect(getMemberLabel('MANAGER')).toBe('Manager')
    expect(getMemberLabel(MEMBER_STATUSES.cancelled)).toBe('Cancelled')
  })

  it('capitalizes the value when nothing else names it', () => {
    expect(getMemberLabel('MEMBER')).toBe('Member')
  })

  it('translates message labels with formatMessage', () => {
    const formatMessage = ({ id }: { id?: string }) => `t:${id}`
    expect(getMemberLabel('MANAGER', undefined, roleOptions, formatMessage)).toBe(
      't:profiles.members.roles.manager',
    )
    expect(getMemberLabel(MEMBER_STATUSES.pending, undefined, undefined, formatMessage)).toBe(
      't:profiles.members.statuses.pending',
    )
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
    expect(DEACTIVATE_MEMBER_OPTION.value).toBe('DEACTIVATE')
    expect(formatMemberOptionLabel(DEACTIVATE_MEMBER_OPTION.label)).toBe('Deactivate')
  })
})
