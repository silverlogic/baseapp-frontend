import type { ImageRecordItem } from '../types'

export interface Page {
  id: number
  title: string
  meta: PageMeta
  featuredImage: FeaturedImage
  body: PageBodyItem[]
}

export interface PageMeta {
  type: string
  htmlUrl: string
  urlPath: string
  slug: string
  lastPublishedAt: string
  searchDescription: string
  locale: string
  ancestors: PageLinkItem[]
}

export interface FeaturedImage {
  image: ImageRecordItem
  altText: string
  caption: string
  attribution: string
}

export interface PageBodyItem {
  type: string
  value: any
  id: string
}

export interface PageLinkItem {
  id: number
  type: string
  title: string
  urlPath: string
}

export interface PageCardItem extends PageLinkItem {
  description: string
  featuredImage: FeaturedImage
}
