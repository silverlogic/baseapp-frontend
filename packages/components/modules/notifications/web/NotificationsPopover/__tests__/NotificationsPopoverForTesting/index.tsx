import withProviders from '../../../../../../__test_utils__/withProviders'
import { NotificationsPopover, NotificationsPopoverProps } from '../../../index'

const NotificationsPopoverForTesting = (props?: Partial<NotificationsPopoverProps>) => {
  return <NotificationsPopover {...props} />
}

export default withProviders(NotificationsPopoverForTesting)
