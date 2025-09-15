import React from 'react'

import { AddIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { IconButton, Typography } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import MemberPersonalInfo from '../../components/MemberPersonalInfo'
import { MEMBER_STATUSES } from '../../constants'
import { EmailListItemContainer, UserListItemContainer } from '../styled'
import { NewEmail, User, VirtuosoListboxFunction } from '../types'

const VirtuosoListbox: VirtuosoListboxFunction = (
  props,
  autocompleteOptions,
  handleItemSelection,
  renderLoadingState,
  hasNext,
  isLoadingNext,
  loadNext,
) => {
  const { children, ...other } = props
  let options = React.Children.toArray(children)
    .filter((child: any) => child && typeof child === 'object' && child.props)
    .map((child: any) => child.props.value)
    .filter(Boolean)
  if (options.length === 0) {
    options = autocompleteOptions
  }
  const height = options.length * 56 > 300 ? 300 : options.length * 56

  const renderItem = (index: number, option: User | NewEmail) => {
    const isNewEmail = 'isNewEmail' in option
    const isEmpty = 'empty' in option
    if (isEmpty) {
      return (
        <UserListItemContainer isEmpty>
          <Typography variant="body2" color="text.secondary">
            No users found
          </Typography>
        </UserListItemContainer>
      )
    }
    return (
      <UserListItemContainer
        key={isNewEmail ? option.email : (option as User).id}
        onClick={() => {
          handleItemSelection(option)
        }}
      >
        {isNewEmail ? (
          <EmailListItemContainer>
            <Typography variant="body2" color="text.secondary">
              {option.email}
            </Typography>
            <IconButton>
              <AddIcon />
            </IconButton>
          </EmailListItemContainer>
        ) : (
          <MemberPersonalInfo
            member={(option as User)?.profile ?? undefined}
            status={(option as User)?.isActive ? MEMBER_STATUSES.active : MEMBER_STATUSES.inactive}
          />
        )}
      </UserListItemContainer>
    )
  }

  return (
    <div {...other}>
      <Virtuoso
        style={{ height }}
        data={options}
        itemContent={(index, option) => renderItem(index, option)}
        components={{
          Footer: renderLoadingState,
        }}
        endReached={() => {
          if (hasNext && !isLoadingNext) {
            loadNext(10)
          }
        }}
        useWindowScroll={false}
      />
    </div>
  )
}

export default VirtuosoListbox
