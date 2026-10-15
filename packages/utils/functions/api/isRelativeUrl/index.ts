/**
 * Whether a configured address is a path on the current host (`/v1`), rather than an absolute
 * URL (`https://api.example.com/v1`) or a protocol-relative one (`//api.example.com/v1`).
 */
export const isRelativeUrl = (url?: string | null): url is string =>
  typeof url === 'string' && url.startsWith('/') && !url.startsWith('//')
