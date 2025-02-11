import { FC } from 'react'

import { ImageProps } from '../../../../components/native/images'
import type { Section } from '../types'

export interface DrawerContentProps {
  ProjectLogo: FC<Partial<ImageProps>>
  sections: Section[]
}
