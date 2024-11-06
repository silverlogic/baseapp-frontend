'use client'

import { FC, useMemo, useTransition } from 'react'

import { LoadingState, Searchbar, useResponsive } from '@baseapp-frontend/design-system'

import { Box, useTheme } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { MessageRoomsListProps } from './types'
import { normalizeMessageRoomCardData } from './utils'

const MessageRoomsList: FC<MessageRoomsListProps> = ({
  items,
  loadNext,
  isLoadingNext,
  hasNext,
  refetch,
  children,
  renderItem,
}) => {
  const theme = useTheme()
  const isMobile = useResponsive('down', 'sm')
  const memoizedItems = useMemo(
    () =>
      items?.edges
        .filter((edge: any) => edge?.node)
        .map((edge: any) => normalizeMessageRoomCardData(edge?.node, false)) || [],
    [items],
  )

  const [isPending, startTransition] = useTransition()

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more comments"
      />
    )
  }

  return (
    <div className="grid h-full w-full grid-rows-[min-content_min-content_auto]">
      <Box
        sx={{
          paddingX: isMobile ? theme.spacing(1.5) : theme.spacing(2.5),
          paddingTop: theme.spacing(2),
        }}
      >
        <Searchbar isPending={isPending} startTransition={startTransition} refetch={refetch} />
      </Box>
      {children}
      <div className="h-full w-full self-start sm:h-screen">
        <Virtuoso
          data={memoizedItems}
          overscan={1}
          itemContent={(_index, item) => renderItem(item)}
          style={{ scrollbarWidth: 'none' }}
          components={{
            Footer: renderLoadingState,
          }}
          endReached={() => {
            if (hasNext) {
              loadNext(5)
            }
          }}
        />
      </div>
    </div>
  )
}

export default MessageRoomsList
