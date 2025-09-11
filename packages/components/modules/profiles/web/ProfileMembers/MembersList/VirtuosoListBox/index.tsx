import React from 'react'

import { Virtuoso } from 'react-virtuoso'

const VirtuosoListBox = (
  props: any,
  autocompleteOptions: any[],
  renderItem: (index: number, option: any) => React.ReactNode,
  renderLoadingState: () => React.ReactNode,
  hasNext: boolean,
  isLoadingNext: boolean,
  loadNext: (count: number) => void,
) => {
  const { children, ...other } = props
  let options = React.Children.toArray(children)
    .filter((child: any) => child && typeof child === 'object' && child.props)
    .map((child: any) => child.props.value)
    .filter(Boolean) // Remove any undefined values
  if (options.length === 0) {
    options = autocompleteOptions
  }
  const height = options.length * 56 > 300 ? 300 : options.length * 56
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
      />
    </div>
  )
}

export default VirtuosoListBox
