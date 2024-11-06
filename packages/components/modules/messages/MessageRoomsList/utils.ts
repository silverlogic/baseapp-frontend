export const normalizeMessageRoomCardData = (item: any, existingRooms: boolean) => {
  const avatarUrl = existingRooms ? `http://localhost:8000/media/${item?.image}` : item?.image?.url // TODO: fix BE image url
  const title = existingRooms ? item?.title : item?.name
  const profileSubtitle = item?.urlPath ? `@${item?.urlPath?.path}` : null
  const subtitle = existingRooms ? 'room subtitle' : profileSubtitle
  const unreadMessagesCount = existingRooms ? item?.unreadMessagesCount : null

  return {
    id: item.id,
    avatarUrl,
    title,
    subtitle,
    unreadMessagesCount,
  }
}
