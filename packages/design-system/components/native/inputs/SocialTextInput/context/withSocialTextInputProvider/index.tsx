import { FC } from 'react'

import SocialTextInputProvider from '../SocialTextInputProvider'

const withSocialTextInputProvider =
  <TProps extends {}>(Component: FC<TProps>) =>
  (props: TProps) => (
    <SocialTextInputProvider>
      <Component {...props} />
    </SocialTextInputProvider>
  )

export default withSocialTextInputProvider
