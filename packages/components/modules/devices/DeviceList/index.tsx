import { FC, Suspense, useMemo } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Box } from '@mui/material'
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { Virtuoso } from 'react-virtuoso'

import { DeviceItemFragment$key } from '../../../__generated__/DeviceItemFragment.graphql'
import { DevicesListFragment$key } from '../../../__generated__/DevicesListFragment.graphql'
import { DevicesListQuery as DevicesListQueryType } from '../../../__generated__/DevicesListQuery.graphql'
import { DevicesListFragment, DevicesListQuery } from '../graphql/queries/DevicesList'
import DefaultDeviceItem from './DeviceItem'
import { DeviceListProps } from './types'

const DeviceList: FC<DeviceListProps> = ({
  LoadingStateProps = {},
  DeviceItem = DefaultDeviceItem,
  VirtuosoProps = {},
}) => {
  const options = { count: 10 }
  const queryRef = useLazyLoadQuery<DevicesListQueryType>(DevicesListQuery, options, {
    fetchPolicy: 'store-and-network',
  })

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    DevicesListQueryType,
    DevicesListFragment$key
  >(DevicesListFragment, queryRef)

  const devices = useMemo(
    () => data?.allUserDevices?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [data?.allUserDevices?.edges],
  )

  const renderDeviceItem = (device?: DeviceItemFragment$key | null) => {
    if (!device) return null
    return <DeviceItem device={device} />
  }

  const renderVirtuosoLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <DefaultLoadingState
        sx={{ paddingTop: 3 }}
        CircularProgressProps={{ size: 15 }}
        {...LoadingStateProps}
      />
    )
  }

  return (
    <Box>
      <Virtuoso
        data={devices}
        style={{ height: 'calc(75vh - 68px)' }}
        itemContent={(_, device) => renderDeviceItem(device)}
        components={{
          Footer: renderVirtuosoLoadingState,
        }}
        endReached={() => {
          if (hasNext) {
            loadNext(10)
          }
        }}
        {...VirtuosoProps}
      />
    </Box>
  )
}

const DeviceListSuspended: FC<DeviceListProps> = (props) => {
  const { LoadingState = DefaultLoadingState, LoadingStateProps = {} } = props

  return (
    <Suspense fallback={<LoadingState {...LoadingStateProps} />}>
      <DeviceList {...props} />
    </Suspense>
  )
}

export default DeviceListSuspended
