function getCookie(name: string): string | null {
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cookies.length; i++) {
      const cookieString = cookies[i]!.trim()
      if (cookieString.substring(0, name.length + 1) === `${name}=`) {
        return decodeURIComponent(cookieString.substring(name.length + 1))
      }
    }
  }
  return null
}

export function getCSRFToken(): string | null {
  return getCookie('csrftoken')
}
