export const removeLeadingSlash = (path: string): string =>
  path.startsWith('/') ? path.slice(1) : path
