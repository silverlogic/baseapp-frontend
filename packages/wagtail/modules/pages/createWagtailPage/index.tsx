import PageTypes from '../../components/PageTypes'
import { WagtailPagesProvider } from '../../providers/WagtailPagesProvider'
import { PagesAPI } from '../../services/Wagtail/PagesAPI'
import { Page } from '../../services/Wagtail/PagesAPI/types'
import { handlePageRequestError } from '../../utils/requests'
import { PageParams, WagtailPageProps } from './types'

const getCurrentPage = async (path: string): Promise<Page> => {
  try {
    return await PagesAPI.getPageByPath(path)
  } catch (error) {
    return handlePageRequestError(error)
  }
}

export const generateWagtailPageComponents = (currentPage: Page) => ({
  WagtailPagesProvider: ({ children, defaultSettings }: WagtailPageProps) => (
    <WagtailPagesProvider
      defaultSettings={{
        currentPage,
        ...(defaultSettings ?? {}),
      }}
    >
      {children}
    </WagtailPagesProvider>
  ),
  WagtailPageTypes: PageTypes,
})

const createWagtailPage = async ({ params }: PageParams) => {
  const currentPage = await getCurrentPage(params.path?.join('/') ?? '/')

  return generateWagtailPageComponents(currentPage)
}

export default createWagtailPage
