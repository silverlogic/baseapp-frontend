# i18n Quick Reference

## 🚀 TL;DR

```tsx
// 1. Add message in code
const title = intl.formatMessage({
  description: 'Page title',
  defaultMessage: 'My Page'
})

// 2. Extract messages
pnpm i18n:extract

// 3. Translate in es.json and pt.json

// Done! 🎉
```

---

## Common Patterns

### Simple Text

```tsx
import { FormattedMessage } from 'react-intl'

<h1>
  <FormattedMessage
    description="Welcome message"
    defaultMessage="Welcome!"
  />
</h1>
```

### Text with Variables

```tsx
import { useIntl } from 'react-intl'

const intl = useIntl()

const message = intl.formatMessage(
  {
    description: 'Greeting with name',
    defaultMessage: 'Hello, {name}!'
  },
  { name: user.name }
)
```

### Plurals

```tsx
const count = 5
const message = intl.formatMessage(
  {
    description: 'Message count',
    defaultMessage: '{count, plural, =0 {No messages} one {# message} other {# messages}}'
  },
  { count }
)
```

### Dates

```tsx
const date = new Date()
const formatted = intl.formatDate(date, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
```

### Numbers

```tsx
const price = 1234.56
const formatted = intl.formatNumber(price, {
  style: 'currency',
  currency: 'USD'
})
```

---

## Workflow Cheat Sheet

| Step | Command | Description |
|------|---------|-------------|
| 1️⃣ Write | Add `intl.formatMessage()` | Add translatable text in code |
| 2️⃣ Extract | `pnpm i18n:extract` | Extract all messages to en.json |
| 3️⃣ Translate | Edit es.json, pt.json | Add translations for other languages |
| 4️⃣ Test | Change language in app | Verify translations work |

---

## File Locations

```
apps/web/i18n/locales/
├── en.json  ← English (auto-generated)
├── es.json  ← Spanish (manual translation)
└── pt.json  ← Portuguese (manual translation)
```

---

## Scripts

```bash
# Extract messages from code
pnpm i18n:extract

# Compile messages (optional, for production optimization)
pnpm i18n:compile
pnpm i18n:compile:all
```

---

## Supported Languages

- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇧🇷 Portuguese (pt)

---

## Best Practices

✅ **DO:**
- Always provide `description` for context
- Use `FormattedMessage` for JSX content
- Use `intl.formatMessage()` for JS strings
- Extract after adding new messages

❌ **DON'T:**
- Don't hardcode user-facing text
- Don't forget to translate to all languages
- Don't use generic descriptions
- Don't manually create IDs

---

## Example Component

```tsx
'use client'

import { FC } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { Button, Typography } from '@mui/material'

const MyComponent: FC = () => {
  const intl = useIntl()

  const handleClick = () => {
    alert(intl.formatMessage({
      description: 'Success notification',
      defaultMessage: 'Action completed successfully!'
    }))
  }

  return (
    <div>
      <Typography variant="h1">
        <FormattedMessage
          description="Page title for dashboard"
          defaultMessage="Dashboard"
        />
      </Typography>

      <Typography variant="body1">
        <FormattedMessage
          description="Description of dashboard features"
          defaultMessage="Manage your account and settings from here."
        />
      </Typography>

      <Button onClick={handleClick}>
        {intl.formatMessage({
          description: 'Button to save changes',
          defaultMessage: 'Save'
        })}
      </Button>
    </div>
  )
}

export default MyComponent
```

---

## Need Help?

📖 Full Guide: [README.md](./README.md)

🌐 FormatJS Docs: https://formatjs.io/

💬 Ask the team!
