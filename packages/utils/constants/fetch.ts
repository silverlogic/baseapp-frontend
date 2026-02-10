export const SERVICES_WITHOUT_TOKEN = [
  /\/auth$/,
  /\/auth\/login$/,
  /\/register$/,
  /\/forgot-password$/,
  /\/forgot-password\/reset$/,
  /\/auth\/pre-auth\/jwt$/,
  /\/auth\/pre-auth\/auth-token$/,
  // AllAuth headless endpoints
  /\/_allauth\/app\/v1\/auth\/login$/,
  /\/_allauth\/app\/v1\/auth\/session$/,
  /\/_allauth\/app\/v1\/auth\/signup$/,
  /\/_allauth\/app\/v1\/auth\/password\/request$/,
  /\/_allauth\/app\/v1\/auth\/password\/reset$/,
  /\/_allauth\/app\/v1\/tokens\/refresh$/,
]
