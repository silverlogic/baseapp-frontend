import { buildAddMembersInput, buildSendInvitationInput } from '../utils'

const emails = [
  { kind: 'email' as const, email: 'ada@example.com' },
  { kind: 'email' as const, email: 'grace@example.com' },
]

describe('buildSendInvitationInput', () => {
  it('sends plain emails when no name or message was entered', () => {
    expect(
      buildSendInvitationInput({
        profileId: 'profile-1',
        role: 'MANAGER',
        members: emails,
        message: '   ',
      }),
    ).toEqual({
      profileId: 'profile-1',
      role: 'MANAGER',
      emails: ['ada@example.com', 'grace@example.com'],
    })
  })

  it('sends invitees with trimmed names once any name was entered', () => {
    expect(
      buildSendInvitationInput({
        profileId: 'profile-1',
        role: 'ADMIN',
        members: [{ ...emails[0]!, firstName: ' Ada ', lastName: '' }, emails[1]!],
        message: ' Welcome aboard ',
      }),
    ).toEqual({
      profileId: 'profile-1',
      role: 'ADMIN',
      invitees: [{ email: 'ada@example.com', firstName: 'Ada' }, { email: 'grace@example.com' }],
      message: 'Welcome aboard',
    })
  })

  it('merges the extra field values without letting them replace the dialog fields', () => {
    expect(
      buildSendInvitationInput({
        profileId: 'profile-1',
        role: 'MANAGER',
        members: [emails[0]!],
        extraValues: { title: 'Engineer', role: 'ADMIN', profileId: 'other' },
      }),
    ).toEqual({
      title: 'Engineer',
      profileId: 'profile-1',
      role: 'MANAGER',
      emails: ['ada@example.com'],
    })
  })
})

describe('buildAddMembersInput', () => {
  it('adds the selected users with the role and the extra field values', () => {
    expect(
      buildAddMembersInput({
        profileId: 'profile-1',
        role: 'MANAGER',
        members: [
          { kind: 'profile', profileId: 'p-1', userId: 'u-1', name: 'Ada' },
          { kind: 'profile', profileId: 'p-2', userId: 'u-2', name: 'Grace' },
        ],
        extraValues: { title: 'Engineer' },
      }),
    ).toEqual({
      title: 'Engineer',
      profileId: 'profile-1',
      usersIds: ['u-1', 'u-2'],
      roleType: 'MANAGER',
    })
  })
})
