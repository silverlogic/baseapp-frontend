// Cookie name for storing the user's language preference. Owned by utils (the
// lower-level package); @baseapp-frontend/i18n re-exports it for its consumers so the
// dependency graph stays one-directional (i18n -> utils).
export const LANGUAGE_COOKIE_NAME = 'Language'
