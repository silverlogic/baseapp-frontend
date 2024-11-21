'use client'

import { FC } from 'react'

import { PageBodyItem } from '../../services/Wagtail/PagesAPI/types'
import { StreamFieldProps } from './types'

const StreamField: FC<StreamFieldProps> = ({ body, availableBlocks }) => (
  <>
    {body.map((block) => {
      const blockType = block.type

      const BlockComponent = availableBlocks[blockType]

      if (BlockComponent) {
        const TypedComponent = BlockComponent as FC<
          Extract<PageBodyItem, { type: typeof blockType }>
        >

        return <TypedComponent key={block.id} {...block} />
      }

      return null
    })}
  </>
)

export default StreamField
