'client side'

import { useWagtailPagesContext } from '../../../providers/WagtailPagesProvider/context'
import StreamField from '../../StreamField'
import { StreamFieldWrapper } from './styled'
import type { SectionStreamBlockProps } from './types'

const SectionStreamBlock = ({ value }: SectionStreamBlockProps) => {
  const { availableBlocks } = useWagtailPagesContext()
  return (
    <StreamFieldWrapper>
      <StreamField body={value} availableBlocks={availableBlocks} />
    </StreamFieldWrapper>
  )
}

export default SectionStreamBlock
