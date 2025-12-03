# Internationalization (i18n) Workflow

This document describes the FormatJS-based internationalization workflow for the utils package.

## Overview

The utils package provides common utility messages (buttons, validation, dates, etc.) that can be used across web and mobile applications. We use FormatJS (react-intl) for internationalization with automated message extraction.

## Current Messages

The utils package currently provides pre-defined messages for:
- **Common UI**: Loading, Error, Success, Cancel, Confirm, Save, Delete, etc.
- **Date/Time**: Today, Yesterday, Period, Date ranges, Relative times
- **Validation**: Required fields, email format, length constraints, date validation

These messages are defined in `locales/en.json`, `locales/es.json`, and `locales/pt.json`.

## Writing Internationalized Code

When adding user-facing text to utility functions, always use `formatMessage` with both an `id` and `defaultMessage`:

```typescript
import { useIntl } from 'react-intl'

export const useMyUtility = () => {
  const intl = useIntl()

  const getMessage = () => {
    return intl.formatMessage({
      id: 'utils.myUtility.message',
      defaultMessage: 'Default message text',
    })
  }

  return { getMessage }
}
```

### Message ID Conventions

All utils messages should be prefixed with `utils.`:
- `utils.common.*` - Common UI strings
- `utils.date.*` - Date-related messages
- `utils.time.*` - Time-related messages
- `utils.validation.*` - Form validation messages

## Extracting Messages

After adding or modifying messages in the code, run the extraction script to update the locale files:

```bash
pnpm i18n:extract
```

This command:
- Scans all TypeScript/TSX files (excluding tests and dist)
- Extracts all `formatMessage` calls
- Updates `locales/en.json` with the extracted messages
- Preserves existing translations

## Compiling Messages (Optional)

For production optimization, you can pre-compile messages to AST format:

```bash
pnpm i18n:compile
```

This creates `locales/en.compiled.json` with pre-parsed message ASTs for faster runtime performance.

## Translation Workflow

1. **Extract English messages**: Run `pnpm i18n:extract` to generate/update `locales/en.json`
2. **Translate to other languages**: Update `locales/es.json` and `locales/pt.json` with translations
3. **Verify translations**: Ensure all keys in `en.json` exist in other locale files
4. **Test**: Verify all messages load correctly in applications

## Locale Files

- `locales/en.json` - English (base language)
- `locales/es.json` - Spanish (manually translated)
- `locales/pt.json` - Portuguese (manually translated)
- `locales/index.ts` - Exports for dynamic loading

## Using Utils Messages

Utils messages are automatically loaded by the `@baseapp-frontend/i18n` package when you use the `loadLocales()` function:

```typescript
import { loadLocales } from '@baseapp-frontend/i18n'

// This will load utils messages along with other package messages
await loadLocales('en', {
  additionalPackages: [
    '@baseapp-frontend/utils/locales',
    '@baseapp-frontend/components/locales'
  ]
})
```

## Related Documentation

- [FormatJS Documentation](https://formatjs.io/docs/react-intl/)
- [Message Declaration Best Practices](https://formatjs.io/docs/getting-started/message-declaration)
- [FormatJS CLI](https://formatjs.io/docs/tooling/cli)
- [@baseapp-frontend/i18n LOCALE_LOADING.md](../i18n/LOCALE_LOADING.md)
