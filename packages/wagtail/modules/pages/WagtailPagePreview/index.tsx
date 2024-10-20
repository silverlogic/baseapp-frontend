import { PagePreviewAPI } from '../../services/Wagtail/PagePreviewAPI'
import { IPage } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { wagtailPage } from '../WagtailPage'
import { IPagePreviewParams } from './types'

const getCurrentPage = async (token: string, contentType: string): Promise<IPage> => {
  try {
    return await PagePreviewAPI.get(token, contentType)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

export const createWagtailPagePreview = async ({ searchParams }: IPagePreviewParams) => {
  const currentPage = await getCurrentPage(searchParams.token, searchParams.content_type)

  return wagtailPage(currentPage)
}
