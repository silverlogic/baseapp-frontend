import { FC } from 'react'

import { AddProfileModalProps } from '../AddProfileModal/types'

export interface AddProfileMenuItemProps {
  addNewProfileLabel?: string
  CreateProfileModal?: FC<AddProfileModalProps>
}
