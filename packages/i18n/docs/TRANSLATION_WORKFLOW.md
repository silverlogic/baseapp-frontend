# Translation Workflow for Developers

This document explains the complete workflow for adding and managing translations in the BaseApp.

## 📋 Quick Commands

```bash
# Extract messages from code → updates en.json
pnpm i18n:extract

# Check translation coverage
pnpm i18n:check

# Compile messages for production (optional)
pnpm i18n:compile:all
```

## 🔄 Complete Workflow

### Scenario 1: Adding a New Feature with Translations

You're building a new "Notifications" feature. Here's the complete workflow:

#### Step 1: Write Code with Translatable Messages

```tsx
// app/notifications/NotificationList.tsx
'use client'

import { FC } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { Button, Typography } from '@mui/material'

const NotificationList: FC = () => {
  const intl = useIntl()
  const notificationCount = 5

  return (
    <div>
      {/* Static text - use FormattedMessage */}
      <Typography variant="h1">
        <FormattedMessage
          description="Page title for notifications page"
          defaultMessage="Notifications"
        />
      </Typography>

      {/* Dynamic text - use intl.formatMessage */}
      <Typography variant="body1">
        {intl.formatMessage(
          {
            description: 'Count of unread notifications',
            defaultMessage: 'You have {count, plural, =0 {no unread notifications} one {# unread notification} other {# unread notifications}}'
          },
          { count: notificationCount }
        )}
      </Typography>

      {/* Button text */}
      <Button>
        {intl.formatMessage({
          description: 'Button to mark all notifications as read',
          defaultMessage: 'Mark all as read'
        })}
      </Button>
    </div>
  )
}
```

#### Step 2: Extract Messages

Run the extraction command:

```bash
pnpm i18n:extract
```

**What happens:**
- Scans all `.ts` and `.tsx` files in `app/`, `components/`, `layouts/`
- Finds all `formatMessage` and `FormattedMessage` calls
- Generates unique IDs based on message content
- Updates `i18n/locales/en.json`

**Output:** `i18n/locales/en.json`
```json
{
  "abc123": "Notifications",
  "def456": "You have {count, plural, =0 {no unread notifications} one {# unread notification} other {# unread notifications}}",
  "ghi789": "Mark all as read"
}
```

#### Step 3: Check What Needs Translation

```bash
pnpm i18n:check
```

**Output:**
```
⚠️  Missing translations in es.json:
   - abc123: "Notifications"
   - def456: "You have {count, plural, =0 {no..."
   - ghi789: "Mark all as read"

⚠️  Missing translations in pt.json:
   - abc123: "Notifications"
   - def456: "You have {count, plural, =0 {no..."
   - ghi789: "Mark all as read"
```

#### Step 4: Add Translations

Open `i18n/locales/es.json` and add translations:

```json
{
  "abc123": "Notificaciones",
  "def456": "Tienes {count, plural, =0 {ninguna notificación sin leer} one {# notificación sin leer} other {# notificaciones sin leer}}",
  "ghi789": "Marcar todas como leídas"
}
```

Open `i18n/locales/pt.json` and add translations:

```json
{
  "abc123": "Notificações",
  "def456": "Você tem {count, plural, =0 {nenhuma notificação não lida} one {# notificação não lida} other {# notificações não lidas}}",
  "ghi789": "Marcar todas como lidas"
}
```

#### Step 5: Verify

```bash
pnpm i18n:check
```

**Output:**
```
✅ All translations are in sync!

📊 Statistics:
   Total messages: 14
   en: 14 messages (100.0% coverage)
   es: 14 messages (100.0% coverage)
   pt: 14 messages (100.0% coverage)
```

#### Step 6: Test in App

1. Run the app: `pnpm dev`
2. Navigate to `/user/settings`
3. Change language to Spanish
4. Navigate to your new feature
5. Verify all text is translated correctly
6. Change to Portuguese and verify again

---

### Scenario 2: Updating Existing Messages

You need to change "Save" to "Save Changes".

#### Step 1: Update the Code

```tsx
// Before
<Button>
  {intl.formatMessage({
    description: 'Button to save',
    defaultMessage: 'Save'
  })}
</Button>

// After
<Button>
  {intl.formatMessage({
    description: 'Button to save changes',
    defaultMessage: 'Save Changes'
  })}
</Button>
```

#### Step 2: Extract

```bash
pnpm i18n:extract
```

**What happens:**
- Old ID for "Save" will be removed from `en.json`
- New ID for "Save Changes" will be added

#### Step 3: Check

```bash
pnpm i18n:check
```

You'll see the new message needs translation in `es.json` and `pt.json`.

#### Step 4: Update Translations

Add the new translations and remove the old ones.

---

### Scenario 3: Handling Plurals

```tsx
const count = items.length

const message = intl.formatMessage(
  {
    description: 'Number of items in cart',
    defaultMessage: '{count, plural, =0 {No items} one {# item} other {# items}} in your cart'
  },
  { count }
)
```

**Translations:**

Spanish:
```json
{
  "xyz789": "{count, plural, =0 {Ningún artículo} one {# artículo} other {# artículos}} en tu carrito"
}
```

Portuguese:
```json
{
  "xyz789": "{count, plural, =0 {Nenhum item} one {# item} other {# itens}} no seu carrinho"
}
```

---

### Scenario 4: Handling Dates and Numbers

```tsx
const date = new Date()
const price = 1234.56

// Date
const formattedDate = intl.formatDate(date, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// Number
const formattedPrice = intl.formatNumber(price, {
  style: 'currency',
  currency: 'USD'
})
```

**Output:**
- English: "December 15, 2024" and "$1,234.56"
- Spanish: "15 de diciembre de 2024" and "USD 1,234.56"
- Portuguese: "15 de dezembro de 2024" and "US$ 1.234,56"

**Note:** Date and number formatting is handled automatically by FormatJS based on the locale. No translation needed!

---

## 🎯 Best Practices

### 1. Meaningful Descriptions

```tsx
// ✅ Good - provides context
intl.formatMessage({
  description: 'Error message when login fails due to invalid credentials',
  defaultMessage: 'Invalid email or password'
})

// ❌ Bad - too vague
intl.formatMessage({
  description: 'Error message',
  defaultMessage: 'Invalid email or password'
})
```

### 2. Keep Related Messages Together

```tsx
// Settings page - all messages together
const messages = {
  title: intl.formatMessage({
    description: 'Settings page title',
    defaultMessage: 'Settings'
  }),
  subtitle: intl.formatMessage({
    description: 'Settings page subtitle',
    defaultMessage: 'Manage your account preferences'
  }),
  saveButton: intl.formatMessage({
    description: 'Button to save settings',
    defaultMessage: 'Save Changes'
  })
}
```

### 3. Use Variables for Dynamic Content

```tsx
// ✅ Good
intl.formatMessage(
  {
    description: 'Welcome message with user name',
    defaultMessage: 'Welcome back, {name}!'
  },
  { name: user.name }
)

// ❌ Bad - string concatenation
`Welcome back, ${user.name}!` // Won't work in other languages
```

### 4. Extract Regularly

```bash
# After adding new features
pnpm i18n:extract

# Before commits
pnpm i18n:check

# Before releases
pnpm i18n:extract && pnpm i18n:check
```

---

## 🚨 Common Pitfalls

### Pitfall 1: Forgetting to Extract

**Problem:** Added messages in code but forgot to extract.

**Solution:** Make extraction part of your workflow. Run `pnpm i18n:extract` before committing.

### Pitfall 2: Hardcoded Text

```tsx
// ❌ Bad
<h1>Settings</h1>

// ✅ Good
<h1>
  <FormattedMessage
    description="Settings page title"
    defaultMessage="Settings"
  />
</h1>
```

### Pitfall 3: String Concatenation

```tsx
// ❌ Bad - doesn't work in other languages
const message = 'You have ' + count + ' messages'

// ✅ Good - uses ICU syntax
const message = intl.formatMessage(
  {
    description: 'Message count',
    defaultMessage: 'You have {count} messages'
  },
  { count }
)
```

### Pitfall 4: Not Testing Translations

Always test your app in all supported languages before shipping!

---

## 📦 Integration with CI/CD

Add these checks to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Check translations
  run: pnpm i18n:check

- name: Extract messages
  run: pnpm i18n:extract

- name: Check if extraction changed files
  run: |
    if [[ $(git diff --stat i18n/locales/en.json) != '' ]]; then
      echo "⚠️  Translation extraction changed en.json. Please commit the changes."
      exit 1
    fi
```

---

## 🆘 Troubleshooting

### Messages not appearing

1. Check browser console for errors
2. Verify message exists in language file
3. Clear browser cache
4. Restart dev server

### Extraction not finding messages

1. Ensure format is correct: `intl.formatMessage({ defaultMessage: '...' })`
2. Check file paths in extraction script
3. Verify files have `.ts` or `.tsx` extension

### Translations not syncing

1. Run `pnpm i18n:check` to see what's missing
2. Ensure all language files have the same keys
3. Check for typos in IDs

---

## 📚 Additional Resources

- **Full Documentation:** [README.md](./README.md)
- **Quick Reference:** [QUICK_START.md](./QUICK_START.md)
- **FormatJS Docs:** https://formatjs.io/
- **ICU Message Syntax:** https://formatjs.io/docs/core-concepts/icu-syntax

---

## 🎓 Training Checklist

Before working with translations, make sure you can:

- [ ] Add a new translatable message using `intl.formatMessage()`
- [ ] Use `<FormattedMessage>` for JSX content
- [ ] Run `pnpm i18n:extract` to extract messages
- [ ] Run `pnpm i18n:check` to check coverage
- [ ] Add translations to `es.json` and `pt.json`
- [ ] Test the app in all three languages
- [ ] Handle plurals with ICU syntax
- [ ] Format dates and numbers with `intl.formatDate()` and `intl.formatNumber()`

---

**Happy translating! 🌍**
