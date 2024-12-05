import { PagePreviewAPI } from '../../services/Wagtail/PagePreviewAPI'
import { Page } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { generateWagtailPageComponents } from '../createWagtailPage'
import { PagePreviewParams } from './types'

const getCurrentPage = async (token: string, contentType: string): Promise<Page> => {
  try {
    return await PagePreviewAPI.get(token, contentType)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

const createWagtailPagePreview = async ({ searchParams }: PagePreviewParams) => {
  const currentPage = await getCurrentPage(searchParams.token, searchParams.content_type)

  return generateWagtailPageComponents(currentPage)
}

export default createWagtailPagePreview
