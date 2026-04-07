import { FC } from 'react'

import { TypographyWithEllipsis } from '@baseapp-frontend/design-system/components/web/typographies'

import { BodyTypographyContainer as DefaultBodyTypographyContainer } from './styled'
import { NotificationBodyProps } from './types'

const NotificationBody: FC<NotificationBodyProps> = ({
  content,
  BodyTypographyContainer = DefaultBodyTypographyContainer,
}) => (
  <BodyTypographyContainer>
    <TypographyWithEllipsis variant="body2" color="text.secondary" maxHeight={64} lineClamp={2}>
      {content ?? ''}
    </TypographyWithEllipsis>
  </BodyTypographyContainer>
)

export default NotificationBody
