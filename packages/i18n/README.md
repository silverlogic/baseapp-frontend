# @baseapp-frontend/i18n

Internationalization utilities, scripts, and documentation for BaseApp projects.

## What's Included

### 📁 Base Translations

Common translations shared across all BaseApp projects:

- `locales/en.json` - English (source)
- `locales/es.json` - Spanish
- `locales/pt.json` - Portuguese

### 🛠️ Scripts

- `scripts/check-translations.js` - Check translation coverage and find missing translations

### 📚 Documentation

- `docs/INDEX.md` - Documentation index and navigation
- `docs/QUICK_START.md` - Quick reference guide
- `docs/README.md` - Complete i18n documentation
- `docs/TRANSLATION_WORKFLOW.md` - Detailed workflow guide

### 🔧 Utilities

- `getMessages()` - Get translations for a locale
- Type definitions for locales
- Constants for supported languages

## Installation

This package is part of the BaseApp monorepo and is automatically available as a workspace dependency.

```bash
# In your app's package.json
{
  "dependencies": {
    "@baseapp-frontend/i18n": "workspace:*"
  }
}
```

## Usage

### Getting Translations

```typescript
import { getMessages, Locale } from '@baseapp-frontend/i18n'

const locale: Locale = 'es'
const messages = getMessages(locale)
```

### Checking Translation Coverage

```bash
# From this package
pnpm check-translations

# From your app (with custom path)
node ../../packages/i18n/scripts/check-translations.js ./i18n/locales en,es,pt
```

### Reading Documentation

All documentation is available in the `docs/` directory:

- Start with `docs/INDEX.md` to find the right guide
- Use `docs/QUICK_START.md` for quick reference
- Read `docs/README.md` for complete documentation
- Follow `docs/TRANSLATION_WORKFLOW.md` for workflows

## Package Structure

```
@baseapp-frontend/i18n/
├── locales/                    # Base translations
│   ├── en.json
│   ├── es.json
│   └── pt.json
├── scripts/                    # Utility scripts
│   └── check-translations.js
├── docs/                       # Documentation
│   ├── INDEX.md
│   ├── QUICK_START.md
│   ├── README.md
│   └── TRANSLATION_WORKFLOW.md
├── index.ts                    # Main exports
├── types.ts                    # TypeScript types
├── utils.ts                    # Utility functions
└── package.json
```

## Development

```bash
# Build the package
pnpm build

# Run linting
pnpm lint

# Check translations
pnpm check-translations

# Clean build artifacts
pnpm clean
```

## App Integration

### Web App

```typescript
// apps/web/i18n/index.ts
import { getMessages, Locale } from '@baseapp-frontend/i18n'
import webEnMessages from './locales/en.json'
import webEsMessages from './locales/es.json'
import webPtMessages from './locales/pt.json'

export const getWebMessages = (locale: Locale): Record<string, string> => {
  const webMessages: Record<Locale, Record<string, string>> = {
    en: webEnMessages,
    es: webEsMessages,
    pt: webPtMessages,
  }

  return webMessages[locale] || webMessages.en
}
```

### Mobile App

```typescript
// apps/mobile/i18n/index.ts
import { getMessages, Locale } from '@baseapp-frontend/i18n'
import mobileEnMessages from './locales/en.json'
import mobileEsMessages from './locales/es.json'
import mobilePtMessages from './locales/pt.json'

export const getMobileMessages = (locale: Locale): Record<string, string> => {
  const mobileMessages: Record<Locale, Record<string, string>> = {
    en: mobileEnMessages,
    es: mobileEsMessages,
    pt: mobilePtMessages,
  }

  return mobileMessages[locale] || mobileMessages.en
}
```

## TypeScript

This package is fully typed. All types are exported from the main entry point:

```typescript
import type { Locale } from '@baseapp-frontend/i18n'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_LABELS } from '@baseapp-frontend/i18n'
```

## Contributing

When adding new common translations:

1. Add to `locales/en.json`
2. Translate to `locales/es.json` and `locales/pt.json`
3. Run `pnpm check-translations` to verify
4. Build and test

## License

MIT
