import { IntlShape, defineMessages } from 'react-intl'
import z from 'zod'

import {
  CREATE_OR_EDIT_GROUP_FORM_VALUE,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION,
} from '../../common/constants'

export const SHARED_MESSAGES = defineMessages({
  somethingWentWrong: {
    id: 'messages.shared.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  memberCount: {
    id: 'messages.shared.memberCount',
    defaultMessage: '{count, plural, one {# member} other {# members}}',
  },
  deletedUser: {
    id: 'messages.shared.deletedUser',
    defaultMessage: 'Deleted User',
  },
  yesterday: {
    id: 'messages.shared.yesterday',
    defaultMessage: 'Yesterday',
  },
  archiveChat: {
    id: 'messages.shared.archiveChat',
    defaultMessage: 'Archive Chat',
  },
  unarchiveChat: {
    id: 'messages.shared.unarchiveChat',
    defaultMessage: 'Unarchive Chat',
  },
  returnToChatRooms: {
    id: 'messages.shared.returnToChatRooms',
    defaultMessage: 'return to existing chat rooms',
  },
  loadingMoreProfiles: {
    id: 'messages.shared.loadingMoreProfiles',
    defaultMessage: 'loading more profiles',
  },
  seeProfile: {
    id: 'messages.shared.seeProfile',
    defaultMessage: 'See Profile',
  },
  leaveGroup: {
    id: 'messages.shared.leaveGroup',
    defaultMessage: 'Leave Group',
  },
  contactDetails: {
    id: 'messages.shared.contactDetails',
    defaultMessage: 'Contact Details',
  },
  members: {
    id: 'messages.shared.members',
    defaultMessage: 'Members',
  },
  remove: {
    id: 'messages.shared.remove',
    defaultMessage: 'Remove',
  },
  addMember: {
    id: 'messages.shared.addMember',
    defaultMessage: 'Add Member',
  },
})

export const GROUP_FORM_VALIDATION_MESSAGES = defineMessages({
  titleRequired: {
    id: 'messages.groupForm.validation.titleRequired',
    defaultMessage: 'Please enter a title',
  },
  titleMaxLength: {
    id: 'messages.groupForm.validation.titleMaxLength',
    defaultMessage: "Title can't be more than 20 characters",
  },
  participantsRequired: {
    id: 'messages.groupForm.validation.participantsRequired',
    defaultMessage: 'Please select at least one member',
  },
})

export const getCreateOrEditGroupFormValidation = (intl: IntlShape) =>
  z.object({
    ...DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION.shape,
    [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z
      .string()
      .min(1, { message: intl.formatMessage(GROUP_FORM_VALIDATION_MESSAGES.titleRequired) })
      .max(20, { message: intl.formatMessage(GROUP_FORM_VALIDATION_MESSAGES.titleMaxLength) }),
    [CREATE_OR_EDIT_GROUP_FORM_VALUE.participants]: z.array(z.any()).min(1, {
      message: intl.formatMessage(GROUP_FORM_VALIDATION_MESSAGES.participantsRequired),
    }),
  })
