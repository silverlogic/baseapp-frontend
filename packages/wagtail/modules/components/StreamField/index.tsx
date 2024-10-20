'use client'

import { FC } from 'react'

import { IPageBodyItem } from '../../services/Wagtail/PagesAPI/types'
import { IStreamFieldProps } from './types'

const StreamField: FC<IStreamFieldProps> = ({ body, availableBlocks }) => (
  <>
    {body.map((block) => {
      const blockType = block.type

      const BlockComponent = availableBlocks[blockType]

      if (BlockComponent) {
        const TypedComponent = BlockComponent as FC<
          Extract<IPageBodyItem, { type: typeof blockType }>
        >

        return <TypedComponent key={block.id} {...block} />
      }

      return null
    })}
  </>
)

export default StreamField
