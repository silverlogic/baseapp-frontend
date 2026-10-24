import { PricePartStyle, PriceSegment } from './types'

const STYLE_BY_PART_TYPE: Partial<Record<Intl.NumberFormatPartTypes, PricePartStyle>> = {
  currency: 'currency',
  integer: 'major',
  group: 'major',
  decimal: 'minor',
  fraction: 'minor',
}

/** Groups formatted price parts by display style, keeping the locale's order and dropping
 * whitespace literals (the layout spaces the segments). */
export const getPriceSegments = (parts: Intl.NumberFormatPart[]): PriceSegment[] =>
  parts.reduce<PriceSegment[]>((segments, part) => {
    const style = STYLE_BY_PART_TYPE[part.type]
    const last = segments[segments.length - 1]
    if (!style) {
      if (part.value.trim() && last) last.value += part.value
      return segments
    }
    if (last?.style === style) {
      last.value += part.value
      return segments
    }
    return [...segments, { style, value: part.value }]
  }, [])
