import { object, string } from 'zod'

/**
 * Validates and normalizes environment variables using a predefined schema.
 *
 * This utility ensures that all specified environment variables are strings
 * and handles cases where variables might be missing or contain unexpected whitespace.
 *
 * @example
 * import { templateEnv } from 'utils/env'
 *
 * const apiUrl = templateEnv.NEXT_PUBLIC_API_BASE_URL
 */
export const templateEnv = object({
  NEXT_PUBLIC_APP_BASE_URL: string().optional(),
  NEXT_PUBLIC_API_BASE_URL: string().optional(),
  NEXT_PUBLIC_RELAY_ENDPOINT: string().optional(),
  NEXT_PUBLIC_WS_RELAY_ENDPOINT: string().optional(),
  NEXT_PUBLIC_E2E_BASE_URL: string().optional(),
  NEXT_PUBLIC_TOKEN_TYPE: string().optional(),
  NEXT_PUBLIC_ENABLE_SENTRY: string().optional(),
  NEXT_PUBLIC_SENTRY_PUBLIC_DSN: string().optional(),
  NEXT_PUBLIC_SENTRY_ENVIRONMENT: string().optional(),
  NEXT_PUBLIC_SENTRY_PROJECT: string().optional(),
  NEXT_PUBLIC_SENTRY_RELEASE: string().optional(),
  NEXT_PUBLIC_SENTRY_ORGANIZATION: string().optional(),
  SENTRY_RELEASE: string().optional(),
  SENTRY_AUTH_TOKEN: string().optional(),
  NODE_ENV: string().optional(),
}).parse(process.env)
