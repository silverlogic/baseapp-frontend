'use client'

import { FC } from 'react'

import { useWagtailPagesContext } from '../../providers'
import { IPageBodyItem } from '../../services/Wagtail/PagesAPI/types'
import { IStreamFieldProps } from './types'

const StreamField: FC<IStreamFieldProps> = ({ body }) => {
  const { streamFields } = useWagtailPagesContext()
  return (
    <>
      {body.map((block) => {
        const blockType = block.type

        const BlockComponent = streamFields[blockType]()

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
}

export default StreamField
