import { FlashListProps } from '@shopify/flash-list'

type ListFooterComponent<TItem> = {
  ListFooterComponent: Pick<FlashListProps<TItem>, 'ListFooterComponent'>
  isLoading?: never
}

type IsLoading = {
  isLoading: boolean
  ListFooterComponent?: never
}

export type InfiniteScrollerViewProps<TItem> = FlashListProps<TItem> &
  Omit<FlashListProps<TItem>, 'ListFooterComponent'> &
  (ListFooterComponent<TItem> | IsLoading)
