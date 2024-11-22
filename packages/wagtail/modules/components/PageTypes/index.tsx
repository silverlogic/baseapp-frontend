'use client'

import { useWagtailPagesContext } from '../../providers/WagtailPagesProvider/context'
import StreamField from '../StreamField'

const PageTypes = () => {
  const { currentPage, availablePageTypes, availableBlocks } = useWagtailPagesContext()

  const streamField = () => (
    <StreamField body={currentPage.body} availableBlocks={availableBlocks} />
  )

  const PageTypeWrapper = availablePageTypes[currentPage.meta.type]

  if (PageTypeWrapper) {
    return <PageTypeWrapper>{streamField()}</PageTypeWrapper>
  }

  return <>{streamField()}</>
}

export default PageTypes
