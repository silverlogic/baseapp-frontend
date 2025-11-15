# Internationalization (i18n) Guide

This guide explains how to add and manage translations in the BaseApp frontend using FormatJS.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Adding New Translations](#adding-new-translations)
- [Extracting Messages](#extracting-messages)
- [Translating to Other Languages](#translating-to-other-languages)
- [Best Practices](#best-practices)
- [Architecture](#architecture)

## Overview

BaseApp uses [FormatJS](https://formatjs.io/) (react-intl) for internationalization with a streamlined workflow:

- **Messages are colocated** with their usage in the code
- **Auto-generated IDs** based on message content (no manual ID management)
- **Type-safe** with TypeScript support
- **Extraction tool** automatically finds all messages
- **Multiple languages** supported out of the box (English, Spanish, Portuguese)

## Quick Start

### 1. Adding a translatable message

Use `intl.formatMessage()` or `<FormattedMessage>` component:

```tsx
import { useIntl, FormattedMessage } from 'react-intl'

function MyComponent() {
  const intl = useIntl()

  return (
    <div>
      {/* Using intl.formatMessage for dynamic content */}
      <h1>{intl.formatMessage({
        description: 'Page title for user dashboard',
        defaultMessage: 'Welcome to your Dashboard'
      })}</h1>

      {/* Using FormattedMessage component for static content */}
      <p>
        <FormattedMessage
          description="Description of what the dashboard shows"
          defaultMessage="Here you can manage all your settings and preferences."
        />
      </p>

      {/* With variables */}
      <p>{intl.formatMessage(
        {
          description: 'Welcome message with user name',
          defaultMessage: 'Hello, {name}! You have {count} new messages.'
        },
        {
          name: user.name,
          count: messageCount
        }
      )}</p>
    </div>
  )
}
```

### 2. Extract messages

After adding new messages, run the extraction script:

```bash
pnpm i18n:extract
```

This will:
- Scan all `.ts` and `.tsx` files in `app/`, `components/`, and `layouts/`
- Extract all `formatMessage` and `FormattedMessage` calls
- Generate/update `i18n/locales/en.json` with auto-generated IDs

### 3. Translate to other languages

Copy the extracted messages to other language files and translate:

```bash
# The en.json will have auto-generated IDs like:
{
  "jc1pMn": "Preferences",
  "efFO0E": "Language",
  "pKdIO4": "Timezone"
}

# Copy to es.json and translate:
{
  "jc1pMn": "Preferencias",
  "efFO0E": "Idioma",
  "pKdIO4": "Zona Horaria"
}

# Copy to pt.json and translate:
{
  "jc1pMn": "Preferências",
  "efFO0E": "Idioma",
  "pKdIO4": "Fuso Horário"
}
```

## Adding New Translations

### Step-by-Step Workflow

1. **Write code with messages**
   ```tsx
   // In your component
   const title = intl.formatMessage({
     description: 'Title for settings page',
     defaultMessage: 'Settings'
   })
   ```

2. **Extract messages**
   ```bash
   pnpm i18n:extract
   ```
   This updates `i18n/locales/en.json` automatically.

3. **Check the extracted file**
   ```bash
   cat i18n/locales/en.json
   ```
   You'll see auto-generated IDs:
   ```json
   {
     "N1UzEA": "Settings"
   }
   ```

4. **Add translations**

   Copy the new entries from `en.json` to `es.json` and `pt.json`, then translate:

   **es.json:**
   ```json
   {
     "N1UzEA": "Configuración"
   }
   ```

   **pt.json:**
   ```json
   {
     "N1UzEA": "Configurações"
   }
   ```

5. **Test**

   Run the app and switch languages in user preferences to verify translations.

## Extracting Messages

### Extract Command

```bash
pnpm i18n:extract
```

### What it does:

- Scans: `app/**/*.{ts,tsx}`, `components/**/*.{ts,tsx}`, `layouts/**/*.{ts,tsx}`
- Generates IDs using SHA-512 hash (first 6 characters in base64)
- Outputs to: `i18n/locales/en.json`
- Format: Simple JSON object

### Advanced Options

If you need to customize extraction, edit the script in `package.json`:

```json
{
  "i18n:extract": "formatjs extract 'app/**/*.{ts,tsx}' --out-file i18n/locales/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]' --format simple"
}
```

Options:
- `--id-interpolation-pattern`: How IDs are generated
- `--format`: Output format (simple, crowdin, smartling, etc.)
- `--ignore`: Patterns to ignore

## Translating to Other Languages

### Supported Languages

Currently supported:
- English (en) - Source language
- Spanish (es)
- Portuguese (pt)

### Translation Workflow

1. **Extract source messages**
   ```bash
   pnpm i18n:extract
   ```

2. **Get the diff**

   Compare `en.json` with `es.json` and `pt.json` to find new/changed messages.

3. **Send to translators**

   You can:
   - Send the JSON files directly to translators
   - Use a translation management tool (Crowdin, Lokalise, etc.)
   - Use AI translation as a starting point (but always review!)

4. **Update translation files**

   Add the translations to `es.json` and `pt.json`.

5. **Verify**

   Test the app in all languages to ensure translations make sense in context.

### Translation File Structure

All language files should have the same keys:

```json
// en.json
{
  "jc1pMn": "Preferences",
  "N1UzEA": "Settings"
}

// es.json
{
  "jc1pMn": "Preferencias",
  "N1UzEA": "Configuración"
}

// pt.json
{
  "jc1pMn": "Preferências",
  "N1UzEA": "Configurações"
}
```

### Adding a New Language

1. Create new file: `i18n/locales/[locale].json`
2. Copy structure from `en.json`
3. Translate all values
4. Add locale to `SUPPORTED_LOCALES` in `baseapp-frontend/packages/utils/i18n/types.ts`
5. Update `getWebMessages` in `i18n/index.ts`

## Best Practices

### 1. Always Provide Description

```tsx
// ✅ Good
intl.formatMessage({
  description: 'Button to save user preferences',
  defaultMessage: 'Save'
})

// ❌ Bad - missing context for translators
intl.formatMessage({
  defaultMessage: 'Save'
})
```

### 2. Use FormattedMessage for Static Content

```tsx
// ✅ Good - static content
<FormattedMessage
  description="Welcome message on homepage"
  defaultMessage="Welcome to BaseApp"
/>

// ✅ Good - dynamic content
const greeting = intl.formatMessage(
  {
    description: 'Personalized greeting',
    defaultMessage: 'Hello, {name}!'
  },
  { name: user.name }
)
```

### 3. Keep Messages Contextual

```tsx
// ✅ Good - specific context
intl.formatMessage({
  description: 'Label for email input field in login form',
  defaultMessage: 'Email'
})

// ❌ Bad - too generic
intl.formatMessage({
  description: 'Email label',
  defaultMessage: 'Email'
})
```

### 4. Use Plural Rules

```tsx
intl.formatMessage(
  {
    description: 'Number of unread messages',
    defaultMessage: '{count, plural, =0 {No messages} one {1 message} other {{count} messages}}'
  },
  { count: messageCount }
)
```

### 5. Extract After Major Changes

Run extraction after:
- Adding new features
- Modifying user-facing text
- Before sending for translation
- Before releases

### 6. Consistent Terminology

Maintain a glossary of common terms and their translations:

| English | Spanish | Portuguese |
|---------|---------|------------|
| Settings | Configuración | Configurações |
| Preferences | Preferencias | Preferências |
| Save | Guardar | Salvar |
| Cancel | Cancelar | Cancelar |

## Architecture

### Message Flow

1. **Source Code** → Messages defined with `defaultMessage`
2. **Extraction** → `pnpm i18n:extract` generates `en.json`
3. **Translation** → Translators create `es.json`, `pt.json`
4. **Runtime** → IntlProvider loads messages based on user's language preference

### File Structure

```
apps/web/
├── i18n/
│   ├── locales/
│   │   ├── en.json          # Extracted English messages (source)
│   │   ├── es.json          # Spanish translations
│   │   └── pt.json          # Portuguese translations
│   ├── index.ts             # getWebMessages function
│   └── README.md            # This file
├── app/                     # Next.js app directory with components
├── components/              # Shared components
└── layouts/                 # Layout components

baseapp-frontend/packages/
├── utils/
│   └── i18n/
│       ├── locales/         # Base translations for utils package
│       │   ├── en.json      # Common utility translations
│       │   ├── es.json
│       │   └── pt.json
│       └── utils.ts         # getMessages function
└── provider/
    └── IntlProvider/        # IntlProvider component
        └── index.tsx        # Automatically loads web messages
```

### How It Works

1. **IntlProviderWrapper** (`packages/provider/IntlProvider/index.tsx`):
   - Detects user's language from cookies
   - Automatically imports web messages from `i18n/locales/`
   - Merges base utils messages with app-specific messages
   - Provides merged messages to all components

2. **Components** use `useIntl()` or `<FormattedMessage>`:
   - Access current locale
   - Format messages with current language
   - Handle plurals, dates, numbers

3. **Message Loading**:
   - Server-side: Locale detected from cookies in RootLayout
   - Client-side: IntlProvider manages locale state
   - Auto-reload: Changing language triggers page reload with new locale

## Troubleshooting

### Messages not updating after extraction

1. Make sure you ran `pnpm i18n:extract`
2. Check that the file was updated: `cat i18n/locales/en.json`
3. Restart dev server if running

### Translation not showing

1. Verify the message exists in all language files
2. Check the ID matches across all files
3. Verify locale is set correctly (check cookies)
4. Clear browser cache and reload

### Extraction not finding messages

1. Make sure messages use correct format:
   - `intl.formatMessage({ defaultMessage: '...' })`
   - `<FormattedMessage defaultMessage="..." />`
2. Check file paths in extraction script
3. Ensure files have `.ts` or `.tsx` extension

## Resources

- [FormatJS Documentation](https://formatjs.io/)
- [react-intl API](https://formatjs.io/docs/react-intl)
- [Message Extraction Guide](https://formatjs.io/docs/getting-started/message-extraction)
- [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax)
