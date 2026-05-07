import type { ToolbarConfig } from '../types'

export interface ToolbarProps {
  config: Required<ToolbarConfig>
  showDiffSourceToggle: boolean
  showUndoRedo: boolean
}
