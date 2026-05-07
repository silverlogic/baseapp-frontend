'use client'

import { FC } from 'react'

import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  StrikeThroughSupSubToggles,
  UndoRedo,
} from '@mdxeditor/editor'

import { ToolbarProps } from './types'

const Toolbar: FC<ToolbarProps> = ({ config, showDiffSourceToggle, showUndoRedo }) => {
  const boldItalicUnderlineOptions = [
    config.bold && ('Bold' as const),
    config.italic && ('Italic' as const),
    config.underline && ('Underline' as const),
  ].filter(Boolean) as ('Bold' | 'Italic' | 'Underline')[]

  const listOptions = [
    config.bulletList && ('bullet' as const),
    config.numberedList && ('number' as const),
    config.checklist && ('check' as const),
  ].filter(Boolean) as ('bullet' | 'number' | 'check')[]

  return (
    <>
      {boldItalicUnderlineOptions.length > 0 && (
        <>
          <BoldItalicUnderlineToggles options={boldItalicUnderlineOptions} />
          <Separator />
        </>
      )}
      {config.strikethrough && (
        <>
          <StrikeThroughSupSubToggles options={['Strikethrough']} />
          <Separator />
        </>
      )}
      {config.code && (
        <>
          <CodeToggle />
          <Separator />
        </>
      )}
      {listOptions.length > 0 && (
        <>
          <ListsToggle options={listOptions} />
          <Separator />
        </>
      )}
      {config.link && (
        <>
          <CreateLink />
          <Separator />
        </>
      )}
      {config.insertTable && (
        <>
          <InsertTable />
          <Separator />
        </>
      )}
      {config.insertCodeBlock && (
        <>
          <InsertCodeBlock />
          <Separator />
        </>
      )}
      {config.insertImage && (
        <>
          <InsertImage />
          <Separator />
        </>
      )}
      {config.insertThematicBreak && (
        <>
          <InsertThematicBreak />
          <Separator />
        </>
      )}
      {showDiffSourceToggle && (
        <DiffSourceToggleWrapper>{showUndoRedo && <UndoRedo />}</DiffSourceToggleWrapper>
      )}
      {!showDiffSourceToggle && showUndoRedo && <UndoRedo />}
    </>
  )
}

export default Toolbar
