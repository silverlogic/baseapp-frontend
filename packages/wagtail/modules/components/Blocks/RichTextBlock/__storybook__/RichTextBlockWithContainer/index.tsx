import { Container } from '@mui/material'

import RichTextBlock from '../..'
import { IRichTextBlockProps } from '../../types'

const RichTextBlockWithContainer = (props: IRichTextBlockProps) => (
  <Container>
    <RichTextBlock {...props} />
  </Container>
)

export default RichTextBlockWithContainer
