'use client'

import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import StreamField from '../../StreamField'
import type { PageBodySectionStreamBlock } from '../../StreamField/types'
import { StreamFieldWrapper } from './styled'

const SectionStreamBlock = ({ blocks }: PageBodySectionStreamBlock) => {
  const { availableBlocks } = useWagtailPagesContext()
  if (!blocks) return null
  return (
    <StreamFieldWrapper>
      <StreamField body={blocks} availableBlocks={availableBlocks} />
    </StreamFieldWrapper>
  )
}

export default SectionStreamBlock
