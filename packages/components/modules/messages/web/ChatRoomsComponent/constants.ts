import { ValueOf } from '@baseapp-frontend/utils'

export const LEFT_PANEL_CONTENT = {
  chatRoomList: 0,
  createChat: 1,
  createGroupChat: 2,
  editGroupChat: 3,
  groupDetails: 4,
} as const
export type LeftPanelContentValues = ValueOf<typeof LEFT_PANEL_CONTENT>
