import type { FC, MouseEvent } from 'react'

import { removeLeadingSlash } from '@baseapp-frontend/utils'

import { ListItemText } from '@mui/material'

import { AvatarWithPlaceholder } from '../../../../../../../avatars'
import { AVATAR_SIZE } from './constants'
import { StyledListItemButton } from './styled'
import type { MentionListItemProps } from './types'

const MentionListItem: FC<MentionListItemProps> = ({ suggestion, selected, onSelect }) => {
  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    onSelect()
  }

  const displayName = suggestion.name.trim() || removeLeadingSlash(suggestion.urlPath)

  return (
    <StyledListItemButton
      selected={selected}
      onMouseDown={handleMouseDown}
      role="option"
      aria-selected={selected}
    >
      <AvatarWithPlaceholder
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        src={suggestion.imageUrl ?? undefined}
        borderWidth="0px"
      />
      <ListItemText primary={displayName} primaryTypographyProps={{ variant: 'body2' }} />
    </StyledListItemButton>
  )
}

export default MentionListItem
