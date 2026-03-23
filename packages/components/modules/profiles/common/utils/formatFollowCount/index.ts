export const formatFollowCount = (count?: number | null): string | number => {
  if (!count || count === 0) return 0
  if (count <= 1000) return count

  if (count < 1050000) {
    if (count >= 1000000) return `${Math.round(count / 1000000)}M`
    return `${Math.round(count / 1000)}K`
  }

  if (count >= 1000000000) {
    const val = Math.round((count / 1000000000) * 10) / 10
    return val % 1 === 0 ? `${val}B` : `${val.toFixed(1)}B`
  }

  const val = Math.round((count / 1000000) * 10) / 10
  return val % 1 === 0 ? `${val}M` : `${val.toFixed(1)}M`
}
