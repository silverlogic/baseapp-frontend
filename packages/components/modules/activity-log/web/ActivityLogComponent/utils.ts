export const getUpdateMessage = (verb: string, diff: Record<string, any>): string => {
  const baseMessage = `Updated ${verb.split('.')[0]}`

  if (!diff) {
    return baseMessage
  }

  const updateMessages: string[] = Object.keys(diff).map((key) => {
    switch (key) {
      case 'image':
        return 'Updated their profile picture'
      case 'banner_image':
        return 'Updated their profile banner'
      case 'biography':
        return 'Updated their bio'
      default:
        return `Updated ${key.replace('_', ' ')}`
    }
  })

  return updateMessages.length > 0 ? updateMessages.join(', ') : baseMessage
}
