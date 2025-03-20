import { ChangeEventHandler, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'

export interface BodyProps extends PropsWithChildren {
  control: any
  handleSearchChange: ChangeEventHandler<HTMLInputElement>
  handleSearchClear: () => void
  isPending: boolean
  onGroupChatCreationButtonClicked: () => void
  // TODO: type this better
  Searchbar: any
  SearchbarProps?: Partial<SearchbarProps>
}
