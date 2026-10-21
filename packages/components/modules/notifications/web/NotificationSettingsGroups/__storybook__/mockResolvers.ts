const channel = (name: string, isActive: boolean) => ({ channel: name, isActive })

export const notificationSettingGroupsMockData = {
  data: {
    me: {
      __typename: 'User',
      id: 'user-1',
      notificationSettingGroups: [
        {
          key: 'EVENTS',
          label: 'Events',
          description: 'Registrations, reminders and schedule changes.',
          isLocked: false,
          channels: [channel('IN_APP', true), channel('EMAIL', true), channel('PUSH', false)],
        },
        {
          key: 'ACCOUNT',
          label: 'Account and security',
          description: 'Password changes and sign-ins from new devices.',
          isLocked: true,
          channels: [channel('IN_APP', true), channel('EMAIL', true)],
        },
        {
          key: 'DIGEST',
          label: 'Weekly digest',
          description: null,
          isLocked: false,
          channels: [channel('EMAIL', false)],
        },
      ],
    },
  },
}

export const emptyNotificationSettingGroupsMockData = {
  data: { me: { __typename: 'User', id: 'user-1', notificationSettingGroups: [] } },
}
