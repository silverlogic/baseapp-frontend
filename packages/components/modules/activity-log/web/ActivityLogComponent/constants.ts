import { defineMessages } from 'react-intl'

export const EVENT_FILTER_OPTIONS = ['All', 'Comments', 'Reactions', 'Posts'] as const

export const EVENT_FILTER_OPTION_MESSAGES = defineMessages({
  All: {
    id: 'activityLog.eventFilter.option.all',
    defaultMessage: 'All',
  },
  Comments: {
    id: 'activityLog.eventFilter.option.comments',
    defaultMessage: 'Comments',
  },
  Reactions: {
    id: 'activityLog.eventFilter.option.reactions',
    defaultMessage: 'Reactions',
  },
  Posts: {
    id: 'activityLog.eventFilter.option.posts',
    defaultMessage: 'Posts',
  },
})

export const UPDATE_MESSAGES = defineMessages({
  updated: {
    id: 'activityLog.logItem.updated',
    defaultMessage: 'Updated {name}',
  },
  profilePicture: {
    id: 'activityLog.logItem.updatedProfilePicture',
    defaultMessage: 'Updated their profile picture',
  },
  profileBanner: {
    id: 'activityLog.logItem.updatedProfileBanner',
    defaultMessage: 'Updated their profile banner',
  },
  bio: {
    id: 'activityLog.logItem.updatedBio',
    defaultMessage: 'Updated their bio',
  },
})
