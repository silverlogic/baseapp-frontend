const channel = (name: string, isActive: boolean) => ({
  channel: name,
  isActive,
})

export const notificationSettingGroupsMockData = {
  data: {
    me: {
      __typename: 'User',
      id: 'VXNlcjox',
      notificationSettingGroups: [
        {
          key: 'EVENTS',
          label: 'Events',
          description: 'Registrations, reminders and schedule changes.',
          isLocked: false,
          channels: [channel('IN_APP', true), channel('EMAIL', true)],
        },
        {
          key: 'ACCOUNT',
          label: 'Account and security',
          description: null,
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

/** A group that offers the ALL channel next to the channels it sets. */
export const notificationSettingGroupsWithAllMockData = {
  data: {
    me: {
      __typename: 'User',
      id: 'VXNlcjox',
      notificationSettingGroups: [
        {
          key: 'NEWS',
          label: 'News',
          description: null,
          isLocked: false,
          channels: [channel('ALL', true), channel('IN_APP', true), channel('EMAIL', true)],
        },
      ],
    },
  },
}

export const emptyNotificationSettingGroupsMockData = {
  data: {
    me: {
      __typename: 'User',
      id: 'VXNlcjox',
      notificationSettingGroups: [],
    },
  },
}

export const notificationSettingsUpdateMockData = {
  data: {
    notificationSettingsUpdate: {
      groups: [
        {
          key: 'EVENTS',
          channels: [channel('IN_APP', true), channel('EMAIL', false)],
        },
      ],
      errors: null,
    },
  },
}

export const notificationSettingsUpdateRejectedMockData = {
  data: {
    notificationSettingsUpdate: {
      groups: null,
      errors: [{ field: 'settings', messages: ['This group cannot be changed right now.'] }],
    },
  },
}
