import { FlashList } from '@shopify/flash-list'

import { LoadingScreen } from '../../displays'
import View from '../View'
import { styles } from './styles'
import { InfiniteScrollerViewProps } from './types'

/**
 * InfiniteScrollerView Component
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * The `InfiniteScrollerView` component provides an infinite scrolling view by wrapping Shopify's FlashList.
 * It handles a footer loading state based on the "isLoading" prop if no custom ListFooterComponent is provided.
 *
 * When ListFooterComponent is not passed, "isLoading" is required and will display a default loading indicator.
 * If a custom ListFooterComponent is provided, the "isLoading" prop is omitted.
 *
 * @param {InfiniteScrollerViewProps<T>} props - The props for configuring the infinite scrolling behavior.
 * @param {boolean} [props.isLoading] - Indicates if the list is currently loading more items (required if ListFooterComponent is not provided).
 * @param {number} [props.estimatedItemSize=200] - The estimated size per list item.
 * @param {React.ComponentType<any> | React.ReactNode} [props.ListFooterComponent] - A custom component to display as the list footer.
 * @param {...any} props - Additional properties are passed down to the underlying FlashList component, all of FlashList's props are supported.
 *
 * @example
 * // Using the default footer loading state:
 * <InfiniteScrollerView
 *   data={data}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   estimatedItemSize={134}
 *   onEndReached={() => {
 *     if (hasNext) {
 *       loadNext(5)
 *     }
 *   }}
 *   isLoading={isLoadingNext}
 * />
 *
 * @example
 * // Using a custom footer component:
 * <InfiniteScrollerView
 *   data={data}
 *   renderItem={({ item }) => <ItemComponent item={item} />}
 *   estimatedItemSize={134}
 *   onEndReached={() => {
 *     if (hasNext) {
 *       loadNext(5)
 *     }
 *   }}
 *   ListFooterComponent={<CustomFooter />}
 * />
 *
 * @returns {JSX.Element} A container wrapping a FlashList with infinite scrolling functionality.
 */

const InfiniteScrollerView = <TItem,>({
  isLoading,
  ListFooterComponent,
  ...props
}: InfiniteScrollerViewProps<TItem>) => {
  const renderFooterLoadingState = () => {
    if (!isLoading) return <View style={{ paddingTop: 24 }} />

    return <LoadingScreen size="small" />
  }

  return (
    <View style={styles.container}>
      <FlashList ListFooterComponent={ListFooterComponent ?? renderFooterLoadingState} {...props} />
    </View>
  )
}

export default InfiniteScrollerView
