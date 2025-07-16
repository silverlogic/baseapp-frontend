'use client'

import { FC } from 'react'

import type { PageBodyItem, StreamFieldProps } from './types'

const StreamField: FC<StreamFieldProps> = ({ body, availableBlocks }) => (
  <>
    {body.map((block) => {
      if (!block) return null

      const BlockComponent = availableBlocks[block.field as PageBodyItem['field']]

      if (BlockComponent) {
        const TypedComponent = BlockComponent as FC<PageBodyItem>

        return <TypedComponent key={block.id} {...block} />
      }

      return null
    })}
  </>
)

export default StreamField
