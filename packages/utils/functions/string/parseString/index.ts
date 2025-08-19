export const parseString = <T>(string: string | undefined): T | undefined => {
  if (string === undefined) {
    return undefined
  }
  try {
    return JSON.parse(string) as T
  } catch {
    return string as T
  }
}
