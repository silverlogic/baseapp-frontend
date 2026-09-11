import { RefObject } from 'react'

import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { CommentAction } from '../../common'

export interface CommentActionSheetProps {
  actions: CommentAction[]
  bottomDrawerRef: RefObject<BottomSheetModal | undefined>
  onActionPress: (action: CommentAction) => void
}
