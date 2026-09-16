import { SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA } from '../constants'
import { hasVisibleContent } from '../utils'

const parseBody = (body: string) =>
  SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA.safeParse({ body, mentionedProfileIds: [] })

describe('hasVisibleContent', () => {
  it('returns false for whitespace-only content', () => {
    expect(hasVisibleContent('')).toBe(false)
    expect(hasVisibleContent('   ')).toBe(false)
    expect(hasVisibleContent('\n\t ')).toBe(false)
  })

  it('returns false for markdown-escaped whitespace-only content', () => {
    expect(hasVisibleContent('&#x20;')).toBe(false)
    expect(hasVisibleContent('&#x20; &#x20;')).toBe(false)
    expect(hasVisibleContent('&#32;')).toBe(false)
    expect(hasVisibleContent('&nbsp;')).toBe(false)
  })

  it('returns true for content with visible characters', () => {
    expect(hasVisibleContent('hello')).toBe(true)
    expect(hasVisibleContent('&#x20;hello&#x20;')).toBe(true)
  })
})

describe('SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA', () => {
  it('rejects empty and whitespace-only bodies', () => {
    expect(parseBody('').success).toBe(false)
    expect(parseBody('   ').success).toBe(false)
  })

  it('rejects bodies that only contain markdown-escaped whitespace', () => {
    expect(parseBody('&#x20;').success).toBe(false)
    expect(parseBody('&#x20; &#x20;').success).toBe(false)
  })

  it('accepts bodies with visible content', () => {
    expect(parseBody('hello').success).toBe(true)
    expect(parseBody('&#x20;hello').success).toBe(true)
  })

  it('rejects bodies over 1000 characters', () => {
    expect(parseBody('a'.repeat(1001)).success).toBe(false)
  })
})
