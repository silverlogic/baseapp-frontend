import type { IPage } from '../../../../services/Wagtail/PagesAPI/types'
import { mockBannerBlockProps } from '../../../Blocks/BannerBlock/__storybook__/mockBannerBlockProps'
import { mockRichTextBlockProps } from '../../../Blocks/RichTextBlock/__storybook__/mockRichTextBlockProps'
import imageFile from './static/image.jpeg'

export const mockCurrentPage: IPage = {
  id: 1,
  title: 'Mock Current Page',
  body: [
    {
      id: 'rich_text_block_1',
      type: 'rich_text_block',
      ...mockRichTextBlockProps,
    },
    {
      id: 'banner_block_1',
      type: 'banner_block',
      ...mockBannerBlockProps,
    },
  ],
  meta: {
    type: 'base.StandardPage',
    htmlUrl: 'https://www.example.com',
    urlPath: '/example/',
    slug: 'example',
    lastPublishedAt: '2022-02-22T22:22:22.222Z',
    searchDescription: 'This is a mock current page.',
    locale: 'en',
    ancestors: [
      {
        id: 1,
        title: 'Root',
        urlPath: '/',
        type: 'root',
      },
    ],
  },
  featuredImage: {
    image: {
      id: 1,
      downloadUrl: imageFile,
      imageSizes: {
        small: {
          width: 100,
          height: 100,
          imageUrl: imageFile,
        },
        medium: {
          width: 200,
          height: 200,
          imageUrl: imageFile,
        },
        mediumSquare: {
          width: 200,
          height: 200,
          imageUrl: imageFile,
        },
        full: {
          width: 400,
          height: 400,
          imageUrl: imageFile,
        },
      },
    },
    altText: '',
    caption: '',
    attribution: '',
  },
}
