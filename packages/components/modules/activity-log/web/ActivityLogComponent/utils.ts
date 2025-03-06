export const getUpdateMessage = (verb: string, diff: Record<string, any>) => {
  if (!diff) return `Updated ${verb.split('.')[0]}`

  const updates: string[] = []

  Object.keys(diff).forEach((key) => {
    if (key === 'image') updates.push('Updated their profile picture')
    else if (key === 'banner_image') updates.push('Updated their profile banner')
    else if (key === 'biography') updates.push('Updated their bio')
    else updates.push(`Updated ${key.replace('_', ' ')}`)
  })

  return updates.length > 0 ? updates.join(', ') : `Updated ${verb.split('.')[0]}`
}
