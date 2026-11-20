import { defineMessages } from 'react-intl'

import { ToolbarConfig } from './types'

export const DEFAULT_TOOLBAR_CONFIG: Required<ToolbarConfig> = {
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  code: true,
  numberedList: true,
  bulletList: true,
  checklist: true,
  link: true,
  insertTable: false,
  insertCodeBlock: false,
  insertImage: false,
  insertThematicBreak: false,
}

export const CODE_BLOCK_LANGUAGES: Record<string, string> = {
  css: 'css',
  txt: 'txt',
  sql: 'sql',
  html: 'html',
  sass: 'sass',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
  js: 'javascript',
  ts: 'typescript',
  '': 'unspecified',
  tsx: 'TypeScript (React)',
  jsx: 'JavaScript (React)',
}

// Keyed by MDXEditor translation key
export const MDX_EDITOR_MESSAGES = defineMessages({
  'codeBlock.inlineLanguage': {
    id: 'designSystem.markdownEditor.codeBlock.inlineLanguage',
    defaultMessage: 'Language',
  },
  'codeBlock.language': {
    id: 'designSystem.markdownEditor.codeBlock.language',
    defaultMessage: 'Code block language',
  },
  'codeBlock.selectLanguage': {
    id: 'designSystem.markdownEditor.codeBlock.selectLanguage',
    defaultMessage: 'Select code block language',
  },
  'codeblock.delete': {
    id: 'designSystem.markdownEditor.codeBlock.delete',
    defaultMessage: 'Delete code block',
  },
  'createLink.cancelTooltip': {
    id: 'designSystem.markdownEditor.createLink.cancelTooltip',
    defaultMessage: 'Cancel change',
  },
  'createLink.saveTooltip': {
    id: 'designSystem.markdownEditor.createLink.saveTooltip',
    defaultMessage: 'Set URL',
  },
  'createLink.text': {
    id: 'designSystem.markdownEditor.createLink.text',
    defaultMessage: 'Anchor text',
  },
  'createLink.textTooltip': {
    id: 'designSystem.markdownEditor.createLink.textTooltip',
    defaultMessage: 'The text to be displayed for the link',
  },
  'createLink.url': { id: 'designSystem.markdownEditor.createLink.url', defaultMessage: 'URL' },
  'createLink.urlPlaceholder': {
    id: 'designSystem.markdownEditor.createLink.urlPlaceholder',
    defaultMessage: 'Select or paste an URL',
  },
  'dialogControls.cancel': { id: 'common.cancel', defaultMessage: 'Cancel' },
  'dialogControls.save': { id: 'common.save', defaultMessage: 'Save' },
  'imageEditor.deleteImage': {
    id: 'designSystem.markdownEditor.imageEditor.deleteImage',
    defaultMessage: 'Delete image',
  },
  'imageEditor.editImage': {
    id: 'designSystem.markdownEditor.imageEditor.editImage',
    defaultMessage: 'Edit image',
  },
  'linkPreview.copied': {
    id: 'designSystem.markdownEditor.linkPreview.copied',
    defaultMessage: 'Copied!',
  },
  'linkPreview.copyToClipboard': {
    id: 'designSystem.markdownEditor.linkPreview.copyToClipboard',
    defaultMessage: 'Copy to clipboard',
  },
  'linkPreview.edit': {
    id: 'designSystem.markdownEditor.linkPreview.edit',
    defaultMessage: 'Edit link URL',
  },
  'linkPreview.open': {
    id: 'designSystem.markdownEditor.linkPreview.open',
    defaultMessage: 'Open {url} in new window',
  },
  'linkPreview.remove': {
    id: 'designSystem.markdownEditor.linkPreview.remove',
    defaultMessage: 'Remove link',
  },
  'table.alignCenter': {
    id: 'designSystem.markdownEditor.table.alignCenter',
    defaultMessage: 'Align center',
  },
  'table.alignLeft': {
    id: 'designSystem.markdownEditor.table.alignLeft',
    defaultMessage: 'Align left',
  },
  'table.alignRight': {
    id: 'designSystem.markdownEditor.table.alignRight',
    defaultMessage: 'Align right',
  },
  'table.columnMenu': {
    id: 'designSystem.markdownEditor.table.columnMenu',
    defaultMessage: 'Column menu',
  },
  'table.deleteColumn': {
    id: 'designSystem.markdownEditor.table.deleteColumn',
    defaultMessage: 'Delete this column',
  },
  'table.deleteRow': {
    id: 'designSystem.markdownEditor.table.deleteRow',
    defaultMessage: 'Delete this row',
  },
  'table.deleteTable': {
    id: 'designSystem.markdownEditor.table.deleteTable',
    defaultMessage: 'Delete table',
  },
  'table.insertColumnLeft': {
    id: 'designSystem.markdownEditor.table.insertColumnLeft',
    defaultMessage: 'Insert a column to the left of this one',
  },
  'table.insertColumnRight': {
    id: 'designSystem.markdownEditor.table.insertColumnRight',
    defaultMessage: 'Insert a column to the right of this one',
  },
  'table.insertRowAbove': {
    id: 'designSystem.markdownEditor.table.insertRowAbove',
    defaultMessage: 'Insert a row above this one',
  },
  'table.insertRowBelow': {
    id: 'designSystem.markdownEditor.table.insertRowBelow',
    defaultMessage: 'Insert a row below this one',
  },
  'table.rowMenu': { id: 'designSystem.markdownEditor.table.rowMenu', defaultMessage: 'Row menu' },
  'table.textAlignment': {
    id: 'designSystem.markdownEditor.table.textAlignment',
    defaultMessage: 'Text alignment',
  },
  'toolbar.bold': { id: 'designSystem.markdownEditor.toolbar.bold', defaultMessage: 'Bold' },
  'toolbar.bulletedList': {
    id: 'designSystem.markdownEditor.toolbar.bulletedList',
    defaultMessage: 'Bulleted list',
  },
  'toolbar.checkList': {
    id: 'designSystem.markdownEditor.toolbar.checkList',
    defaultMessage: 'Check list',
  },
  'toolbar.codeBlock': {
    id: 'designSystem.markdownEditor.toolbar.codeBlock',
    defaultMessage: 'Insert Code Block',
  },
  'toolbar.diffMode': {
    id: 'designSystem.markdownEditor.toolbar.diffMode',
    defaultMessage: 'Diff mode',
  },
  'toolbar.image': {
    id: 'designSystem.markdownEditor.toolbar.image',
    defaultMessage: 'Insert image',
  },
  'toolbar.inlineCode': {
    id: 'designSystem.markdownEditor.toolbar.inlineCode',
    defaultMessage: 'Inline code format',
  },
  'toolbar.italic': { id: 'designSystem.markdownEditor.toolbar.italic', defaultMessage: 'Italic' },
  'toolbar.link': { id: 'designSystem.markdownEditor.toolbar.link', defaultMessage: 'Create link' },
  'toolbar.numberedList': {
    id: 'designSystem.markdownEditor.toolbar.numberedList',
    defaultMessage: 'Numbered list',
  },
  'toolbar.redo': {
    id: 'designSystem.markdownEditor.toolbar.redo',
    defaultMessage: 'Redo {shortcut}',
  },
  'toolbar.removeBold': {
    id: 'designSystem.markdownEditor.toolbar.removeBold',
    defaultMessage: 'Remove bold',
  },
  'toolbar.removeInlineCode': {
    id: 'designSystem.markdownEditor.toolbar.removeInlineCode',
    defaultMessage: 'Remove code format',
  },
  'toolbar.removeItalic': {
    id: 'designSystem.markdownEditor.toolbar.removeItalic',
    defaultMessage: 'Remove italic',
  },
  'toolbar.removeStrikethrough': {
    id: 'designSystem.markdownEditor.toolbar.removeStrikethrough',
    defaultMessage: 'Remove strikethrough',
  },
  'toolbar.removeSubscript': {
    id: 'designSystem.markdownEditor.toolbar.removeSubscript',
    defaultMessage: 'Remove subscript',
  },
  'toolbar.removeSuperscript': {
    id: 'designSystem.markdownEditor.toolbar.removeSuperscript',
    defaultMessage: 'Remove superscript',
  },
  'toolbar.removeUnderline': {
    id: 'designSystem.markdownEditor.toolbar.removeUnderline',
    defaultMessage: 'Remove underline',
  },
  'toolbar.richText': {
    id: 'designSystem.markdownEditor.toolbar.richText',
    defaultMessage: 'Rich text',
  },
  'toolbar.source': {
    id: 'designSystem.markdownEditor.toolbar.source',
    defaultMessage: 'Source mode',
  },
  'toolbar.strikethrough': {
    id: 'designSystem.markdownEditor.toolbar.strikethrough',
    defaultMessage: 'Strikethrough',
  },
  'toolbar.subscript': {
    id: 'designSystem.markdownEditor.toolbar.subscript',
    defaultMessage: 'Subscript',
  },
  'toolbar.superscript': {
    id: 'designSystem.markdownEditor.toolbar.superscript',
    defaultMessage: 'Superscript',
  },
  'toolbar.table': {
    id: 'designSystem.markdownEditor.toolbar.table',
    defaultMessage: 'Insert Table',
  },
  'toolbar.thematicBreak': {
    id: 'designSystem.markdownEditor.toolbar.thematicBreak',
    defaultMessage: 'Insert thematic break',
  },
  'toolbar.underline': {
    id: 'designSystem.markdownEditor.toolbar.underline',
    defaultMessage: 'Underline',
  },
  'toolbar.undo': {
    id: 'designSystem.markdownEditor.toolbar.undo',
    defaultMessage: 'Undo {shortcut}',
  },
  'uploadImage.addViaUrlInstructions': {
    id: 'designSystem.markdownEditor.uploadImage.addViaUrlInstructions',
    defaultMessage: 'Or add an image from an URL:',
  },
  'uploadImage.addViaUrlInstructionsNoUpload': {
    id: 'designSystem.markdownEditor.uploadImage.addViaUrlInstructionsNoUpload',
    defaultMessage: 'Add an image from an URL:',
  },
  'uploadImage.alt': { id: 'designSystem.markdownEditor.uploadImage.alt', defaultMessage: 'Alt:' },
  'uploadImage.autoCompletePlaceholder': {
    id: 'designSystem.markdownEditor.uploadImage.autoCompletePlaceholder',
    defaultMessage: 'Select or paste an image src',
  },
  'uploadImage.dialogTitle': {
    id: 'designSystem.markdownEditor.uploadImage.dialogTitle',
    defaultMessage: 'Upload an image',
  },
  'uploadImage.height': {
    id: 'designSystem.markdownEditor.uploadImage.height',
    defaultMessage: 'Height:',
  },
  'uploadImage.title': {
    id: 'designSystem.markdownEditor.uploadImage.title',
    defaultMessage: 'Title:',
  },
  'uploadImage.uploadInstructions': {
    id: 'designSystem.markdownEditor.uploadImage.uploadInstructions',
    defaultMessage: 'Upload an image from your device:',
  },
  'uploadImage.width': {
    id: 'designSystem.markdownEditor.uploadImage.width',
    defaultMessage: 'Width:',
  },
})
