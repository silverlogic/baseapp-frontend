import { PropsWithChildren } from 'react'

import { LoadMoreFn, RefetchFnDynamic } from 'react-relay'

export interface MessageRoomsListProps extends PropsWithChildren {
  items: any
  loadNext: LoadMoreFn<any>
  isLoadingNext: boolean
  hasNext: boolean
  refetch: RefetchFnDynamic<any, any>
  renderItem: (item: any) => any
}
