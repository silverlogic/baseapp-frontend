# @baseapp-frontend/i18n

Internationalization for BaseApp: locale types, the `IntlProvider` wrapper, language persistence, date helpers, the shared `common.*` catalog and the translation coverage script. Built on [FormatJS / react-intl](https://formatjs.io/docs/react-intl/).

Supported locales: `en` (source), `es`, `pt`.

## Exports

| Export | Purpose |
|---|---|
| `SUPPORTED_LOCALES`, `DEFAULT_LOCALE`, `LOCALE_LABELS`, `Locale` | Locale list, fallback and display names |
| `LANGUAGE_COOKIE_NAME` | Cookie (web) / SecureStore key (mobile) holding the user's language. Owned by `@baseapp-frontend/utils`, re-exported here |
| `IntlProvider` | Wraps react-intl's provider; merges this package's catalog with `additionalMessages` |
| `useLocale()` | Current locale plus `setLocale`, which persists the choice and reloads the page |
| `getLanguage()` / `setLanguage()` | Read / write the stored language (cookie, server request cookie or SecureStore) |
| `getCurrentLocale()` | Stored language, else the browser language, else `DEFAULT_LOCALE` |
| `getMessages(locale, extra?)` | This package's catalog for a locale |
| `formatDateI18n`, `formatTimeI18n`, `formatRelativeTimeI18n`, `formatDateWithDiffNowI18n`, `useDateFormatter` | Locale-aware date formatting |

**Server Components:** the package root re-exports the client provider, and react-intl creates a React context at import time, so importing either from a Server Component crashes. On the server import the deep paths (`@baseapp-frontend/i18n/types`, `@baseapp-frontend/i18n/utils`) and build an `IntlShape` with `createIntl` from `@formatjs/intl`.

## Where catalogs live

Each package that renders text owns a `locales/{en,es,pt}.json` (plus a `locales/index.ts` exporting them by locale), and its message ids start with a namespace for that package or module (`common.*`, `utils.*`, `comments.*`, `messages.*`, …). The consuming app imports the catalogs it needs, merges them with its own, and passes the result to `IntlProvider` through `additionalMessages`. Later catalogs override earlier ones, so an app can reword any package message by reusing its id.

## Writing translatable code

```tsx
import { useIntl } from 'react-intl'

const intl = useIntl()

intl.formatMessage({ id: 'comments.replies.showMore', defaultMessage: 'Show more replies ({count})' }, { count })
```

- Always pass a static `id` and `defaultMessage`; `formatjs extract` cannot read computed ones. Pick between two complete messages instead of building an id.
- Labels referenced from data (tabs, statuses, roles) go in a `defineMessages` map in `constants.ts` and are translated at render.
- One sentence is one message. Use ICU `{count, plural, one {…} other {…}}` for counts and rich-text tags (`<b>…</b>`, `<link>…</link>`) for inline formatting, never concatenated fragments.
- Format numbers, currency and dates with `intl.formatNumber` / `intl.formatDate` or the helpers above, not hand-built strings.
- Zod schemas with user-facing messages are built by a factory that takes `intl` (`getXValidationSchema(intl)`).
- Code under a `common/` folder that native also runs must not call `useIntl` (native has no `IntlProvider` yet); translate in the web component instead.

## Updating catalogs

```bash
pnpm i18n:extract          # in the package: regenerates locales/en.json from the code
node ../i18n/scripts/check-translations.js locales en,es,pt   # reports keys missing from es/pt
```

1. Write or change the message in code, then run `pnpm i18n:extract`.
2. Add the same ids to `es.json` and `pt.json`, keeping ICU arguments and tags identical to English.
3. Run the coverage check; it exits non-zero when a locale is missing keys.

`pnpm check-translations` in this package checks the `common.*` catalog the same way.
