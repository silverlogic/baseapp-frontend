# i18n Documentation Index

Welcome to the BaseApp internationalization (i18n) documentation! 🌍

## 📚 Documentation

Choose the guide that fits your needs:

### 🚀 [Quick Start Guide](./QUICK_START.md)
**Best for:** Getting started quickly

- TL;DR examples
- Common patterns
- Quick reference tables
- Cheat sheets

**Time to read:** 5 minutes

---

### 📖 [Complete Documentation](./README.md)
**Best for:** Understanding the full system

- Detailed overview
- Architecture explanation
- Comprehensive examples
- Best practices
- Troubleshooting guide

**Time to read:** 15-20 minutes

---

### 🔄 [Translation Workflow](./TRANSLATION_WORKFLOW.md)
**Best for:** Step-by-step workflows

- Real-world scenarios
- Complete workflow examples
- Common pitfalls
- CI/CD integration
- Training checklist

**Time to read:** 10-15 minutes

---

## 🛠️ Quick Commands

```bash
# Extract messages from source code
pnpm i18n:extract

# Check translation coverage
pnpm i18n:check

# Compile messages (optional)
pnpm i18n:compile:all
```

---

## 📁 File Structure

```
i18n/
├── locales/
│   ├── en.json              # English (source, auto-generated)
│   ├── es.json              # Spanish (manual translation)
│   └── pt.json              # Portuguese (manual translation)
├── check-translations.js    # Script to check missing translations
├── index.ts                 # getWebMessages function
├── INDEX.md                 # This file
├── QUICK_START.md          # Quick reference guide
├── README.md               # Complete documentation
└── TRANSLATION_WORKFLOW.md # Workflow guide
```

---

## 🎯 Common Tasks

| Task | Documentation | Command |
|------|--------------|---------|
| Add new translatable text | [Quick Start](./QUICK_START.md#common-patterns) | Write code → `pnpm i18n:extract` |
| Update existing translation | [Workflow](./TRANSLATION_WORKFLOW.md#scenario-2-updating-existing-messages) | Update code → `pnpm i18n:extract` |
| Check missing translations | [Quick Start](./QUICK_START.md#scripts) | `pnpm i18n:check` |
| Translate to Spanish/Portuguese | [README](./README.md#translating-to-other-languages) | Edit `es.json` / `pt.json` |
| Handle plurals | [Workflow](./TRANSLATION_WORKFLOW.md#scenario-3-handling-plurals) | Use ICU syntax |
| Format dates/numbers | [Workflow](./TRANSLATION_WORKFLOW.md#scenario-4-handling-dates-and-numbers) | Use `intl.formatDate()` / `intl.formatNumber()` |

---

## 🎓 Learning Path

### Level 1: Beginner
**Goal:** Add your first translatable message

1. Read [Quick Start](./QUICK_START.md) (5 min)
2. Follow the TL;DR example
3. Run `pnpm i18n:extract`
4. Verify it works

### Level 2: Intermediate
**Goal:** Handle complex translations

1. Read [Common Patterns](./QUICK_START.md#common-patterns) (10 min)
2. Learn about variables and plurals
3. Practice with real examples
4. Check your work with `pnpm i18n:check`

### Level 3: Advanced
**Goal:** Master the complete workflow

1. Read [Translation Workflow](./TRANSLATION_WORKFLOW.md) (15 min)
2. Understand all scenarios
3. Learn best practices
4. Review troubleshooting guide

### Level 4: Expert
**Goal:** Maintain and optimize the i18n system

1. Read [Complete Documentation](./README.md) (20 min)
2. Understand architecture
3. Learn optimization techniques
4. Help others with translations

---

## 💡 Tips

- **Start simple:** Use `FormattedMessage` for static text, `intl.formatMessage()` for dynamic
- **Extract often:** Run `pnpm i18n:extract` after adding messages
- **Check coverage:** Use `pnpm i18n:check` before commits
- **Test thoroughly:** Switch languages in the app to verify translations
- **Ask for help:** The team is here to help!

---

## 🆘 Need Help?

1. **Check documentation** - Start with [Quick Start](./QUICK_START.md)
2. **Look for examples** - See [Translation Workflow](./TRANSLATION_WORKFLOW.md)
3. **Run diagnostics** - Use `pnpm i18n:check`
4. **Ask the team** - We're here to help!

---

## 🔗 External Resources

- [FormatJS Documentation](https://formatjs.io/)
- [react-intl API](https://formatjs.io/docs/react-intl)
- [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax)
- [Message Extraction](https://formatjs.io/docs/getting-started/message-extraction)

---

**Happy translating! 🌍**
