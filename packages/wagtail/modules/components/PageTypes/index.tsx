'use client'

import { useWagtailPagesContext } from '../../providers/WagtailPagesProvider/context'
import StreamField from '../StreamField'

const PageTypes = () => {
  const { currentPage, availablePageTypes, availableBlocks } = useWagtailPagesContext()

  const streamField = () => {
    if (!currentPage.body) return null
    return <StreamField body={currentPage.body} availableBlocks={availableBlocks} />
  }

  if (currentPage.pageType) {
    const PageTypeWrapper = availablePageTypes[currentPage.pageType]

    if (PageTypeWrapper) {
      return <PageTypeWrapper>{streamField()}</PageTypeWrapper>
    }
  }

  return <>{streamField()}</>
}

export default PageTypes
