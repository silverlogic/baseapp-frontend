'use client'

import { FC } from 'react'

import { AvatarButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { NewGroupIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Searchbar as DefaultSearchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { useIntl } from 'react-intl'

import { MainContainer, SearchbarContainer } from './styled'
import { BodyProps } from './types'

const Body: FC<BodyProps> = ({
  AvatarButtonIcon = NewGroupIcon,
  children,
  control,
  groupChatCreateButtonCaption,
  handleSearchChange,
  handleSearchClear,
  isPending,
  onGroupChatCreationButtonClicked,
  Searchbar = DefaultSearchbar,
  SearchbarProps = {},
}) => {
  const intl = useIntl()

  return (
    <MainContainer>
      <SearchbarContainer>
        <Searchbar
          name="search"
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          control={control}
          isPending={isPending}
          {...SearchbarProps}
        />
      </SearchbarContainer>
      <AvatarButton
        onClick={onGroupChatCreationButtonClicked}
        caption={
          groupChatCreateButtonCaption ??
          intl.formatMessage({
            id: 'messages.chatCreate.newGroupButton',
            defaultMessage: 'New Group',
          })
        }
        Icon={AvatarButtonIcon}
      />
      {children}
    </MainContainer>
  )
}

export default Body
