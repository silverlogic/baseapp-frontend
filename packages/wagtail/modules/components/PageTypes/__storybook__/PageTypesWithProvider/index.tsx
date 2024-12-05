import PageTypes from '../..'
import { WagtailPagesProvider } from '../../../../providers/WagtailPagesProvider'
import type { WagtailPagesContextState } from '../../../../providers/WagtailPagesProvider/types'
import type { PartialExcept } from '../../../../services/Wagtail/types'

const PageTypesWithProvider = ({
  currentPage,
  availableBlocks,
}: PartialExcept<WagtailPagesContextState, 'currentPage'>) => (
  <WagtailPagesProvider
    defaultSettings={{
      currentPage,
      availableBlocks,
    }}
  >
    <PageTypes />
  </WagtailPagesProvider>
)

export default PageTypesWithProvider
