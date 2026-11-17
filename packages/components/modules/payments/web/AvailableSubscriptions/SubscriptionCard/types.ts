export type PricePartStyle = 'currency' | 'major' | 'minor'

export interface PriceSegment {
  style: PricePartStyle
  value: string
}
