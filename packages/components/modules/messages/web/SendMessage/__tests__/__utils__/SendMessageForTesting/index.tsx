import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import SendMessage from '../../../index'
import { SendMessageProps } from '../../../types'
import { TEST_ROOM_ID } from '../../__mocks__/requests'

/**
 * `mode: 'plain-text'` swaps the rich-text `MarkdownEditorField` for the plain
 * `TextareaField`, so the field is a real `textbox` the spec can address.
 */
const SendMessageForTesting = (props?: Partial<SendMessageProps>) => (
  <SendMessage roomId={TEST_ROOM_ID} SocialInputProps={{ mode: 'plain-text' }} {...props} />
)

export default withComponentCompleteTestProviders(SendMessageForTesting)
