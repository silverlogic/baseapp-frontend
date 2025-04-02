export const maskEmail = (
  email: string | undefined,
  maskDomain: boolean = false,
  visibleUsernameChars: number = 3,
  visibleDomainChars: number = 2,
  maskChar: string = '*',
): string => {
  if (!email || !email.includes('@')) return ''

  const [username, domain] = email.split('@')

  if (!username) return ''

  const visibleLength = Math.min(visibleUsernameChars, username.length)
  const maskedUsername =
    username.slice(0, visibleLength) + maskChar.repeat(username.length - visibleLength)

  if (maskDomain && domain && domain.includes('.')) {
    const [domainName, ...tldParts] = domain.split('.')
    const topLevelDomain = tldParts.join('.')

    if (!domainName) return `${maskedUsername}@${domain}`

    const visibleDomainLength = Math.min(visibleDomainChars, domainName.length)
    const maskedDomainName =
      domainName.slice(0, visibleDomainLength) +
      maskChar.repeat(domainName.length - visibleDomainLength)

    return `${maskedUsername}@${maskedDomainName}.${topLevelDomain}`
  }

  return `${maskedUsername}@${domain}`
}
