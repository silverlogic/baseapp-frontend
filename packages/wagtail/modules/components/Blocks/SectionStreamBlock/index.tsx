import StreamField from '../../StreamField'
import { StreamFieldWrapper } from './styles'
import type { ISectionStreamBlockProps } from './types'

const SectionStreamBlock = ({ value }: ISectionStreamBlockProps) => (
  <StreamFieldWrapper>
    <StreamField body={value} />
  </StreamFieldWrapper>
)

export default SectionStreamBlock
