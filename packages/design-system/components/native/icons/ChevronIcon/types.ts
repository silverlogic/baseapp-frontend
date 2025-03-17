import { SvgIconProps } from '../types'

type Directions = 'up' | 'down' | 'left' | 'right'

export type RotateRecord = Record<Directions, string>

export interface ChevronIconProps extends SvgIconProps {
  direction?: Directions
}
