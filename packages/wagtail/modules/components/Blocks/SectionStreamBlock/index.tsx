'client side'

import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import StreamField from '../../StreamField'
import { StreamFieldWrapper } from './styled'
import type { ISectionStreamBlockProps } from './types'

const SectionStreamBlock = ({ value }: ISectionStreamBlockProps) => {
  const { availableBlocks } = useWagtailPagesContext()
  return (
    <StreamFieldWrapper>
      <StreamField body={value} availableBlocks={availableBlocks} />
    </StreamFieldWrapper>
  )
}

export default SectionStreamBlock
