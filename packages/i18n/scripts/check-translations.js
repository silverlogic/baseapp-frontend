#!/usr/bin/env node

/**
 * Check for missing translations across language files
 *
 * Usage:
 *   node scripts/check-translations.js [localesDir] [languages]
 *
 * Examples:
 *   node scripts/check-translations.js
 *   node scripts/check-translations.js ./i18n/locales en,es,pt
 *   node scripts/check-translations.js ../../apps/web/i18n/locales
 */

const fs = require('fs')
const path = require('path')

// Parse command line arguments
const args = process.argv.slice(2)
const LOCALES_DIR = args[0] ? path.resolve(args[0]) : path.join(process.cwd(), 'locales')
const LANGUAGES = args[1] ? args[1].split(',') : ['en', 'es', 'pt']

function loadTranslations(lang) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`)

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`)
    return {}
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    console.error(`❌ Error loading ${lang}.json:`, error.message)
    return {}
  }
}

function checkTranslations() {
  console.log(`🔍 Checking translations in: ${LOCALES_DIR}\n`)

  const translations = {}
  LANGUAGES.forEach(lang => {
    translations[lang] = loadTranslations(lang)
  })

  const sourceLanguage = LANGUAGES[0] // First language is the source
  const sourceKeys = Object.keys(translations[sourceLanguage] || {})
  let hasIssues = false

  if (sourceKeys.length === 0) {
    console.error(`❌ No messages found in ${sourceLanguage}.json`)
    console.error(`   Make sure the file exists and contains translations.`)
    process.exit(1)
  }

  LANGUAGES.forEach(lang => {
    if (lang === sourceLanguage) return // Skip source language

    const langKeys = Object.keys(translations[lang] || {})
    const missing = sourceKeys.filter(key => !langKeys.includes(key))
    const extra = langKeys.filter(key => !sourceKeys.includes(key))

    if (missing.length > 0) {
      hasIssues = true
      console.log(`⚠️  Missing translations in ${lang}.json:`)
      missing.forEach(key => {
        const sourceText = translations[sourceLanguage][key]
        const preview = sourceText.length > 50 ? sourceText.substring(0, 50) + '...' : sourceText
        console.log(`   - ${key}: "${preview}"`)
      })
      console.log()
    }

    if (extra.length > 0) {
      hasIssues = true
      console.log(`⚠️  Extra translations in ${lang}.json (not in ${sourceLanguage}.json):`)
      extra.forEach(key => {
        console.log(`   - ${key}: "${translations[lang][key]}"`)
      })
      console.log()
    }
  })

  if (!hasIssues) {
    console.log('✅ All translations are in sync!\n')
    console.log(`📊 Statistics:`)
    console.log(`   Total messages: ${sourceKeys.length}`)
    LANGUAGES.forEach(lang => {
      const langKeys = Object.keys(translations[lang] || {})
      const coverage = sourceKeys.length > 0 ? ((langKeys.length / sourceKeys.length) * 100).toFixed(1) : 0
      console.log(`   ${lang}: ${langKeys.length} messages (${coverage}% coverage)`)
    })
  } else {
    console.log('\n💡 Tips:')
    console.log('   1. Extract messages: pnpm i18n:extract')
    console.log('   2. Copy new entries from en.json to other language files')
    console.log('   3. Translate the new entries')
    console.log('   4. Run this check again\n')
    process.exit(1)
  }
}

checkTranslations()
