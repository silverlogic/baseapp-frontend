import { Container } from '@mui/material'

import RichTextBlock from '../..'
import { RichTextBlockProps } from '../../types'

const RichTextBlockWithContainer = (props: RichTextBlockProps) => (
  <Container>
    <RichTextBlock {...props} />
  </Container>
)

export default RichTextBlockWithContainer
