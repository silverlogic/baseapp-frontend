export interface CommentReplyButtonProps {
  onReply: () => void
  isLoadingReplies: boolean
  totalCommentsCount?: number | null
  commentId: string
  isDisabled?: boolean
}
