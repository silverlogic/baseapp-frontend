'use client'

import { useWagtailPagesContext } from '../../../providers'
import StreamField from '../../StreamField'

const PageBuilder = () => {
  const { currentPage, availablePageTypes } = useWagtailPagesContext()

  const streamField = () => <StreamField body={currentPage.body} />

  const PageTypeWrapper = availablePageTypes()[currentPage.meta.type]

  if (PageTypeWrapper) {
    return <PageTypeWrapper>{streamField()}</PageTypeWrapper>
  }

  return <>{streamField()}</>
}

export default PageBuilder
