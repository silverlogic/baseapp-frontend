import { FC } from 'react'

import { TypographyWithEllipsis } from '@baseapp-frontend/design-system'

import { BodyTypographyContainer } from './styled'
import { NotificationCommentBodyProps } from './types'

const NotificationCommentBody: FC<NotificationCommentBodyProps> = ({ content }) => (
  <BodyTypographyContainer>
    <TypographyWithEllipsis variant="body2" maxHeight={64} lineClamp={2}>
      {content}
    </TypographyWithEllipsis>
  </BodyTypographyContainer>
)

export default NotificationCommentBody
