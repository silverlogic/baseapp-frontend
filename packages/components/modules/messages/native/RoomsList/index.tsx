import { FC, Suspense } from 'react'

import { LoadingScreen } from '@baseapp-frontend/design-system/components/native/displays'

import RoomsListComponent from './RoomsListComponent'
import { RoomsListProps } from './types'

const RoomsList: FC<RoomsListProps> = ({ targetRef, searchParam, selectedTab }) => (
  <RoomsListComponent targetRef={targetRef} searchParam={searchParam} selectedTab={selectedTab} />
)

const SuspendedRoomsList = (props: RoomsListProps) => (
  <Suspense fallback={<LoadingScreen />}>
    <RoomsList {...props} />
  </Suspense>
)

export default SuspendedRoomsList
