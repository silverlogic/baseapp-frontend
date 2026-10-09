# Internationalization (i18n) Workflow

This document describes the FormatJS-based internationalization workflow for the components package.

## Overview

We use FormatJS (react-intl) for internationalization with automated message extraction. This ensures that all translatable strings are properly extracted from the codebase and available for translation.

## Writing Internationalized Code

When adding user-facing text to components, always use `formatMessage` with both an `id` and `defaultMessage`:

```typescript
import { useIntl } from 'react-intl'

const MyComponent = () => {
  const intl = useIntl()

  return (
    <button>
      {intl.formatMessage({
        id: 'components.myComponent.button',
        defaultMessage: 'Click me!',
      })}
    </button>
  )
}
```

### Best Practices

1. **Always include `defaultMessage`**: This serves as both the fallback text and documentation of what the message should say.

2. **Use descriptive IDs**: Follow the pattern `module.component.element` (e.g., `comments.reply.button`)

3. **Avoid dynamic IDs**: The extraction tool can only detect static strings. Instead of:
   ```typescript
   // ❌ DON'T DO THIS
   intl.formatMessage({
     id: isPinned ? 'unpin' : 'pin',
     defaultMessage: isPinned ? 'Unpin' : 'Pin'
   })
   ```

   Do this:
   ```typescript
   // ✅ DO THIS
   const pinMessage = intl.formatMessage({
     id: 'comments.actions.pin',
     defaultMessage: 'Pin Comment',
   })
   const unpinMessage = intl.formatMessage({
     id: 'comments.actions.unpin',
     defaultMessage: 'Unpin Comment',
   })
   const label = isPinned ? unpinMessage : pinMessage
   ```

4. **Use parameters for dynamic values**:
   ```typescript
   intl.formatMessage(
     {
       id: 'comments.replies.showMore',
       defaultMessage: 'Show more replies ({count})',
     },
     { count: repliesLeft }
   )
   ```

## Extracting Messages

After adding or modifying messages in the code, run the extraction script to update the locale files:

```bash
pnpm i18n:extract
```

This command:
- Scans all TypeScript/TSX files in the `modules/` directory
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
4. **Test**: Run tests to verify all messages load correctly

## Locale Files

- `locales/en.json` - English (base language, auto-generated)
- `locales/es.json` - Spanish (manually translated)
- `locales/pt.json` - Portuguese (manually translated)
- `locales/index.ts` - Exports for dynamic loading

## Troubleshooting

### Messages not extracted

If messages aren't being extracted:
1. Ensure `id` and `defaultMessage` are static strings (not variables)
2. Check that files are under `modules/` directory
3. Verify the `formatMessage` call syntax is correct

### Missing translations

If you see English text in other languages:
1. Run `pnpm i18n:extract` to update `en.json`
2. Copy new keys to `es.json` and `pt.json`
3. Translate the `defaultMessage` values

## Related Documentation

- [FormatJS Documentation](https://formatjs.io/docs/react-intl/)
- [Message Declaration Best Practices](https://formatjs.io/docs/getting-started/message-declaration)
- [FormatJS CLI](https://formatjs.io/docs/tooling/cli)
