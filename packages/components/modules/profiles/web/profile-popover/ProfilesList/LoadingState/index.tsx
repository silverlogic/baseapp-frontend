import { FC } from 'react'

import { ProfileMenuItemSkeleton } from './styled'

const LoadingState: FC = () => (
  <>
    <ProfileMenuItemSkeleton variant="rectangular" sx={{ mb: 0.5 }} />
    <ProfileMenuItemSkeleton variant="rectangular" />
  </>
)

export default LoadingState
