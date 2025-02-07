import { FC } from 'react'

import { CreateProfileModalProps } from './CreateProfileModal/types'

export interface AddProfileMenuItemProps {
  addNewProfileLabel?: string
  CreateProfileModal?: FC<CreateProfileModalProps>
}
