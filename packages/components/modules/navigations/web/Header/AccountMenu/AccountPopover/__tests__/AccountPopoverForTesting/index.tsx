import AccountPopover from '../..'
import { AccountPopoverProps } from '../../types'
import withProviders from '../withProviders'

const AccountPopoverForTesting = (props?: Partial<AccountPopoverProps>) => (
  <AccountPopover {...props} />
)

export default withProviders(AccountPopoverForTesting)
