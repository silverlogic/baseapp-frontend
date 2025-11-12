import { FC, Suspense } from 'react'

import RoomsListComponent from './RoomsListComponent'
import { RoomsListProps } from './types'

const RoomsList: FC<RoomsListProps> = ({ targetRef, searchParam, selectedTab }) => (
  <RoomsListComponent targetRef={targetRef} searchParam={searchParam} selectedTab={selectedTab} />
)

const SuspendedRoomsList = (props: RoomsListProps) => (
  <Suspense>
    <RoomsList {...props} />
  </Suspense>
)

export default SuspendedRoomsList
