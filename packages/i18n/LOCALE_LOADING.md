# Locale Loading System

## Overview

The i18n package provides a simple, path-based locale loading system that automatically handles code splitting for client-side and preloading for server-side rendering.

## Key Features

- **Zero Boilerplate**: Just export your JSON files, no loader functions needed
- **Convention-Based**: Packages export locales from `/locales` directory
- **Code Splitting**: Client-side loads only the needed locale
- **SSR Support**: Server-side can preload all locales
- **Simple Configuration**: Just provide package paths
- **Extensible**: Easy to add new locale packages

## Basic Usage

### 1. Load Locales (Client-Side)

```typescript
import { loadLocales } from '@baseapp-frontend/i18n'

// Load default packages (i18n + utils)
const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
])

// Or use the convenience function
import { loadDefaultLocales } from '@baseapp-frontend/i18n'
const messages = await loadDefaultLocales('en')
```

### 2. With IntlProvider (Recommended)

```typescript
import { IntlProvider, loadLocales } from '@baseapp-frontend/i18n'
import { useState, useEffect } from 'react'

function App() {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState({})

  useEffect(() => {
    loadLocales(locale, [
      '@baseapp-frontend/i18n/locales',
      '@baseapp-frontend/utils/locales',
      '@your-app/locales', // Your app's locales
    ]).then(setMessages)
  }, [locale])

  return (
    <IntlProvider locale={locale} messages={messages}>
      <YourApp />
    </IntlProvider>
  )
}
```

### 3. Server-Side Rendering

```typescript
import { loadAllLocales } from '@baseapp-frontend/i18n'

// Load all locales for SSR
const localeMap = await loadAllLocales([
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
])

// Access messages for a specific locale
const enMessages = localeMap.get('en')
const esMessages = localeMap.get('es')
const ptMessages = localeMap.get('pt')
```

## Adding Locale Support to a Package

### Step 1: Create Locale Files

Create a `locales/` directory in your package:

```
packages/your-package/
  ├── locales/
  │   ├── en.json
  │   ├── es.json
  │   ├── pt.json
  │   └── index.ts
  ├── package.json
  └── index.ts
```

### Step 2: Add Locale Content

**locales/en.json:**
```json
{
  "your-package.welcome": "Welcome",
  "your-package.goodbye": "Goodbye"
}
```

**locales/es.json:**
```json
{
  "your-package.welcome": "Bienvenido",
  "your-package.goodbye": "Adiós"
}
```

**locales/pt.json:**
```json
{
  "your-package.welcome": "Bem-vindo",
  "your-package.goodbye": "Adeus"
}
```

### Step 3: Export Locale Files

**locales/index.ts:**
```typescript
/**
 * Export all locale files for dynamic loading
 */
export { default as en } from './en.json'
export { default as es } from './es.json'
export { default as pt } from './pt.json'
```

That's it! No loader functions needed. The system will automatically load your locales.

### Step 4: Use in Your App

```typescript
import { loadLocales } from '@baseapp-frontend/i18n'

const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
  '@your-package/locales', // Your new package!
])
```

## Advanced Usage

### Custom Package Paths

```typescript
import { loadLocales } from '@baseapp-frontend/i18n'

// Load from custom paths
const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
  '@baseapp-frontend/components/locales',
  '@baseapp-frontend/authentication/locales',
  '@your-app/locales',
])
```

### Adding Additional Messages

```typescript
import { loadLocales } from '@baseapp-frontend/i18n'

const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
], {
  additionalMessages: {
    'custom.override': 'Custom value',
    'app.specific': 'App-specific string',
  },
})
```

### Using Default Packages with Additions

```typescript
import { loadDefaultLocales } from '@baseapp-frontend/i18n'

// Load default packages + your app's locales
const messages = await loadDefaultLocales('en', {
  additionalPackages: [
    '@your-app/locales',
    '@your-app/features/locales',
  ],
})
```

### Selective Loading by Context

```typescript
// Admin panel - load all packages
const adminMessages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
  '@baseapp-frontend/components/locales',
  '@your-app/admin/locales',
])

// Public site - load only essential packages
const publicMessages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
])
```

## Package Structure

### Default Packages

- **@baseapp-frontend/i18n/locales**: Core i18n messages (date formats, common strings)
- **@baseapp-frontend/utils/locales**: Utility-specific messages (time.ago, date.today, etc.)

### Adding More Packages

Any package can provide locales:

```
packages/
  ├── i18n/locales/          ← Core i18n
  ├── utils/locales/         ← Utils-specific
  ├── components/locales/    ← Component labels
  ├── authentication/locales/← Auth messages
  └── your-app/locales/      ← App-specific
```

## How It Works

### Client-Side (Code Splitting)

When you call `loadLocales('en', [...])`:

1. System dynamically imports only the `en` export from each package's `locales/index.ts`
2. Webpack/bundler creates separate chunks for each locale
3. Only the needed locale is downloaded
4. Messages are merged in order (later packages override earlier ones)

### Server-Side (Preloading)

When you call `loadAllLocales([...])`:

1. System imports all locale exports from each package
2. All locales are loaded synchronously
3. Returns a Map with all locale messages ready to use

## API Reference

### Functions

#### `loadLocales(locale, packagePaths, options?): Promise<Record<string, string>>`
Load a specific locale from multiple packages.

**Parameters:**
- `locale: Locale` - The locale to load ('en', 'es', or 'pt')
- `packagePaths: string[]` - Array of package paths (e.g., ['@baseapp-frontend/i18n/locales'])
- `options?: { additionalMessages?: Record<string, string> }` - Optional additional messages

**Returns:** Promise resolving to merged locale messages

#### `loadAllLocales(packagePaths, locales?, options?): Promise<Map<Locale, Record<string, string>>>`
Load all locales from multiple packages (for SSR).

**Parameters:**
- `packagePaths: string[]` - Array of package paths
- `locales?: Locale[]` - Array of locales to load (defaults to ['en', 'es', 'pt'])
- `options?: { additionalMessages?: Record<Locale, Record<string, string>> }` - Optional additional messages per locale

**Returns:** Promise resolving to Map of locale to messages

#### `loadDefaultLocales(locale, options?): Promise<Record<string, string>>`
Convenience function to load default BaseApp packages.

**Parameters:**
- `locale: Locale` - The locale to load
- `options?: { additionalPackages?: string[], additionalMessages?: Record<string, string> }` - Optional additional packages and messages

**Returns:** Promise resolving to merged locale messages

### Constants

#### `DEFAULT_LOCALE_PACKAGES: string[]`
Array of default BaseApp locale package paths:
```typescript
[
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
]
```

### Types

```typescript
type Locale = 'en' | 'es' | 'pt'

const SUPPORTED_LOCALES: Locale[] = ['en', 'es', 'pt']
```

## Migration from Old System

### Before (Complex)

Each package needed to implement loader functions:

```typescript
// packages/utils/locales/index.ts
export async function loadUtilsLocale(locale: Locale): Promise<Record<string, string>> {
  switch (locale) {
    case 'en':
      return (await import('./en.json')).default
    case 'es':
      return (await import('./es.json')).default
    case 'pt':
      return (await import('./pt.json')).default
    default:
      return {}
  }
}

export function loadUtilsLocaleSync(locale: Locale): Record<string, string> {
  const locales = {
    en: require('./en.json'),
    es: require('./es.json'),
    pt: require('./pt.json'),
  }
  return locales[locale] || {}
}

// Usage
import { registerLocalePackage } from '@baseapp-frontend/i18n'
import { loadUtilsLocale } from '@baseapp-frontend/utils'

registerLocalePackage('utils', loadUtilsLocale)
const messages = await loadLocales('en')
```

### After (Simple)

Just export your JSON files:

```typescript
// packages/utils/locales/index.ts
export { default as en } from './en.json'
export { default as es } from './es.json'
export { default as pt } from './pt.json'

// Usage
import { loadLocales } from '@baseapp-frontend/i18n'

const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
])
```

## Benefits

✅ **Zero Boilerplate** - No repetitive loader functions
✅ **Smaller Bundles** - Client only loads the needed locale
✅ **Better DX** - Just export JSON files and you're done
✅ **Flexible** - Choose which packages to load per context
✅ **SSR Optimized** - Automatic preloading support
✅ **Type Safe** - Full TypeScript support
✅ **Convention-Based** - Predictable structure across packages

## Examples

### Example 1: Basic React App

```typescript
import { loadDefaultLocales } from '@baseapp-frontend/i18n'
import { IntlProvider } from 'react-intl'

function App() {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState({})

  useEffect(() => {
    loadDefaultLocales(locale).then(setMessages)
  }, [locale])

  return (
    <IntlProvider locale={locale} messages={messages}>
      <YourApp onChangeLocale={setLocale} />
    </IntlProvider>
  )
}
```

### Example 2: Next.js with SSR

```typescript
// app/[locale]/layout.tsx
import { loadAllLocales } from '@baseapp-frontend/i18n'
import { IntlProvider } from 'react-intl'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'pt' }]
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Preload all locales during build
  const localeMap = await loadAllLocales([
    '@baseapp-frontend/i18n/locales',
    '@baseapp-frontend/utils/locales',
    '@your-app/locales',
  ])

  const messages = localeMap.get(params.locale as Locale) || {}

  return (
    <IntlProvider locale={params.locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}
```

### Example 3: Adding App-Specific Locales

```typescript
// your-app/locales/index.ts
export { default as en } from './en.json'
export { default as es } from './es.json'
export { default as pt } from './pt.json'

// your-app/app.tsx
import { loadLocales } from '@baseapp-frontend/i18n'

const messages = await loadLocales('en', [
  '@baseapp-frontend/i18n/locales',
  '@baseapp-frontend/utils/locales',
  '@your-app/locales', // Your app's locales!
])
```

## Troubleshooting

### Dynamic import errors

If you get errors about dynamic imports, make sure:
1. Your bundler supports dynamic imports (Webpack, Vite, etc.)
2. The package paths are exact (e.g., `'@baseapp-frontend/i18n/locales'`)
3. The packages are installed and available

### Missing translations

If translations are missing:
1. Check that the package path is correct
2. Verify the locale file exists (e.g., `en.json`)
3. Ensure the locale file is exported from `index.ts`
4. Check console for loading errors
