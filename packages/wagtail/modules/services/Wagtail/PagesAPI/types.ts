import type { IImageRecordItem } from '../types'

export interface IPage {
  id: number
  title: string
  meta: IPageMeta
  featuredImage: IFeaturedImage
  body: IPageBodyItem[]
}

export interface IPageMeta {
  type: string
  htmlUrl: string
  urlPath: string
  slug: string
  lastPublishedAt: string
  searchDescription: string
  locale: string
  ancestors: IPageLinkItem[]
}

export interface IFeaturedImage {
  image: IImageRecordItem
  altText: string
  caption: string
  attribution: string
}

export interface IPageBodyItem {
  type: string
  value: any
  id: string
}

export interface IPageLinkItem {
  id: number
  type: string
  title: string
  urlPath: string
}

export interface IPageCardItem extends IPageLinkItem {
  description: string
  featuredImage: IFeaturedImage
}
