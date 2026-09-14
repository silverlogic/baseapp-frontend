import type { FC } from 'react'

import { Skeleton } from '@mui/material'

import { AVATAR_SIZE } from '../MentionListItem/constants'
import { SKELETON_PLACEHOLDER_ROWS } from '../constants'
import { SkeletonRow } from './styled'

/**
 * Always renders the maximum number of placeholder rows; the surrounding
 * `StyledPaper` clips the visible portion via its dynamic `maxHeight`. This
 * way the skeleton stays prop-less and the paper alone owns the menu's height
 * across all states (loading, empty, populated).
 */
const MentionListSkeleton: FC = () => (
  <>
    {Array.from({ length: SKELETON_PLACEHOLDER_ROWS }).map((_, index) => (
      // Fixed-length placeholder, no reorder — index keys are safe here.
      // eslint-disable-next-line react/no-array-index-key
      <SkeletonRow key={index}>
        <Skeleton variant="circular" width={AVATAR_SIZE} height={AVATAR_SIZE} />
        <Skeleton variant="text" width="60%" />
      </SkeletonRow>
    ))}
  </>
)

export default MentionListSkeleton
