import { FC } from 'react'

import { AddProfileModalProps } from '../AddProfileModal'

export interface AddProfileMenuItemProps {
  addNewProfileLabel?: string
  CreateProfileModal?: FC<AddProfileModalProps>
}
