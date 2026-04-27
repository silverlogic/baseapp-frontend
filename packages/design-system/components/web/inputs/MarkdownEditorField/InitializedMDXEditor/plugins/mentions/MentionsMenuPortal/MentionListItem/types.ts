import type { MentionProfileSuggestion } from '../../types'

export interface MentionListItemProps {
  suggestion: MentionProfileSuggestion
  selected: boolean
  onSelect: () => void
}
