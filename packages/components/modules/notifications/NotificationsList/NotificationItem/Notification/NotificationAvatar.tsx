import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

const NotificationAvatar = ({
  actorAvatar,
  actorName,
}: {
  actorAvatar: string
  actorName: string
}) => (
  <AvatarWithPlaceholder
    width={40}
    height={40}
    alt={actorName ?? `Notification's user avatar`}
    src={actorAvatar}
  />
)

export default NotificationAvatar
