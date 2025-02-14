import { FC } from 'react'

import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { BodyTypographyContainer } from './styled'
import { NotificationBodyProps } from './types'

const NotificationBody: FC<NotificationBodyProps> = ({ content }) => (
  <BodyTypographyContainer>
    <TypographyWithEllipsis variant="body2" maxHeight={64} lineClamp={2}>
      {content ?? ''}
    </TypographyWithEllipsis>
  </BodyTypographyContainer>
)

export default NotificationBody
