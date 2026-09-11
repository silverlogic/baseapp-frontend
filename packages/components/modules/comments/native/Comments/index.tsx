import { withCommentReplyProvider } from '../../common'
import BaseComments from '../BaseComments'

/**
 * The native comments thread: `BaseComments` wrapped in the `CommentReplyProvider`, mirroring
 * the web `Comments` component.
 */
export default withCommentReplyProvider(BaseComments)
