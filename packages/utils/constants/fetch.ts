// Paths, relative to the API address, that are called without the user's token. Anchored at both
// ends so an authenticated path that merely ends the same way (`/events/1/register`) keeps it.
export const SERVICES_WITHOUT_TOKEN = [
  /^\/auth$/,
  /^\/auth\/login$/,
  /^\/register$/,
  /^\/forgot-password$/,
  /^\/forgot-password\/reset$/,
  /^\/auth\/pre-auth\/jwt$/,
  /^\/auth\/pre-auth\/auth-token$/,
]
