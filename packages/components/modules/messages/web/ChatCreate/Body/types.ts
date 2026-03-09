import { ChangeEventHandler, FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { SvgIconProps } from '@mui/material'

export interface BodyProps extends PropsWithChildren {
  AvatarButtonIcon?: FC<SvgIconProps>
  control: any
  groupChatCreateButtonCaption?: string
  handleSearchChange: ChangeEventHandler<HTMLInputElement>
  handleSearchClear: () => void
  isPending: boolean
  onGroupChatCreationButtonClicked: () => void
  // TODO: type this better
  Searchbar: any
  SearchbarProps?: Partial<SearchbarProps>
}
