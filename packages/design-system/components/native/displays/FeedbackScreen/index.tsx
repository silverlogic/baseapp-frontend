import { FormattedMessage } from 'react-intl'

import Text from '../../typographies/Text'
import View from '../../views/View'

// TODO: implement a generic feedback screen
const FeedbackScreen = () => (
  <View>
    <Text variant="h1">
      <FormattedMessage
        id="designSystem.feedbackScreen.noPermission"
        defaultMessage="You don't have enough permissions to access this page."
      />
    </Text>
  </View>
)

export default FeedbackScreen
